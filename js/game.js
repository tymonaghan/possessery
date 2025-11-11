// POSSESSION - Core Game Logic

const GameState = {
  // Player resources
  money: 1500,
  day: 1,
  act: 1,

  // Progression tracking
  successfulRepos: 0,
  totalEarned: 0,
  complaintsReceived: 0,
  failedRepos: 0,

  // Office progression
  officeLevel: 0,

  // Personal life
  familyStatus: 'together', // together, strained, separated, divorced

  // Resources
  employees: [],
  equipment: [],

  // Current state
  availableJobs: [],
  selectedJobs: [],
  dayResults: [],
  pendingConsequences: [],
  displayedConsequences: [],

  // Messages
  currentFamilyMessage: '',
  currentMail: [],

  // Tutorial
  isFirstDay: true
};

// Initialize game
function initGame() {
  // Start with basic employees
  GameState.employees = [...EMPLOYEES.starter];
  GameState.equipment = [...EQUIPMENT.starter];

  // Generate first set of jobs
  generateDailyJobs();

  // Set first family message
  updateFamilyStatus();

  // Generate mail
  generateMail();
}

// Generate daily jobs
function generateDailyJobs() {
  const jobCount = 6;
  GameState.availableJobs = [];

  const templateKeys = Object.keys(JOB_TEMPLATES);

  for (let i = 0; i < jobCount; i++) {
    // Select random template
    const templateKey = templateKeys[Math.floor(Math.random() * templateKeys.length)];
    const template = JOB_TEMPLATES[templateKey];

    // Adjust difficulty based on act
    let difficulty = template.difficulty;
    if (GameState.act === 2) difficulty = Math.min(5, difficulty + 1);
    if (GameState.act === 3) difficulty = Math.min(5, difficulty + 2);

    // Generate job from template
    const job = {
      id: `job_${GameState.day}_${i}`,
      template: templateKey,
      debtor: {
        name: template.names[Math.floor(Math.random() * template.names.length)],
        address: STREETS[Math.floor(Math.random() * STREETS.length)],
        backstory: '' // Hidden until result
      },
      vehicle: {
        description: template.vehicles[Math.floor(Math.random() * template.vehicles.length)],
        value: template.debtRange[0] + Math.random() * (template.debtRange[1] - template.debtRange[0])
      },
      debt: {
        amount: template.debtRange[0] + Math.random() * (template.debtRange[1] - template.debtRange[0]),
        monthsDelinquent: Math.floor(Math.random() * 6) + 1
      },
      difficulty: difficulty,
      payout: Math.floor((template.debtRange[0] + template.debtRange[1]) / 2 * template.payoutMultiplier),
      requiredSkill: template.requiredSkill,
      assigned: false,
      assignedEmployee: null,
      assignedEquipment: null
    };

    GameState.availableJobs.push(job);
  }
}

// Calculate job success
function calculateJobSuccess(job, employee, equipment) {
  // Base success chance from difficulty
  let successChance = 1.0 - (job.difficulty * 0.15); // 85% at diff 1, 25% at diff 5

  // Employee skill bonus
  const skillMatch = employee.skill === job.requiredSkill ? 0.2 : 0.1;
  successChance += (employee.skillLevel * 0.05) + skillMatch;

  // Equipment bonus
  successChance += equipment.bonus;

  // Clamp between 0.1 and 0.95
  successChance = Math.max(0.1, Math.min(0.95, successChance));

  return Math.random() < successChance;
}

// Resolve a single job
function resolveJob(job) {
  const template = JOB_TEMPLATES[job.template];
  const employee = job.assignedEmployee;
  const equipment = job.assignedEquipment;

  const success = calculateJobSuccess(job, employee, equipment);

  let result = {
    jobId: job.id,
    debtor: job.debtor,
    vehicle: job.vehicle,
    success: success,
    payout: success ? job.payout : 0,
    message: success ? template.successMessage : template.failureMessage,
    employee: employee.name,
    equipment: equipment.name
  };

  // Generate consequence
  const consequence = generateConsequence(job, template, success);
  if (consequence) {
    GameState.pendingConsequences.push(consequence);
  }

  return result;
}

// Generate consequence from job outcome
function generateConsequence(job, template, success) {
  // 40% chance to generate consequence
  if (Math.random() > 0.4) return null;

  const consequencePool = success ? template.consequences.success : template.consequences.failure;
  if (consequencePool.length === 0) return null;

  const delay = Math.floor(Math.random() * 3) + 1; // 1-3 days

  let text = consequencePool[Math.floor(Math.random() * consequencePool.length)];

  // Replace placeholders
  text = text.replace('{name}', job.debtor.name);
  text = text.replace('{street}', job.debtor.address);

  // Determine source based on act
  let source = '';
  if (GameState.act === 1) {
    const sources = ['Sheriff\'s Report', 'Facebook', 'Overheard at diner', 'Local News'];
    source = sources[Math.floor(Math.random() * sources.length)];
  } else if (GameState.act === 2) {
    const sources = ['NextDoor', 'Local News', 'Employee Comment', 'Community Board'];
    source = sources[Math.floor(Math.random() * sources.length)];
  } else {
    const sources = ['Performance Dashboard', 'Creditor Email', 'Company Metrics', 'Industry Report'];
    source = sources[Math.floor(Math.random() * sources.length)];
  }

  return {
    triggerJobId: job.id,
    deliveryDay: GameState.day + delay,
    text: text,
    source: source,
    delivered: false
  };
}

// Execute all selected jobs
function executeDay() {
  GameState.dayResults = [];

  let dailyCost = 0;

  // Process each selected job
  for (const job of GameState.selectedJobs) {
    const result = resolveJob(job);
    GameState.dayResults.push(result);

    // Update stats
    if (result.success) {
      GameState.successfulRepos++;
      GameState.totalEarned += result.payout;
      GameState.money += result.payout;
    } else {
      GameState.failedRepos++;
    }

    // Subtract employee cost
    dailyCost += job.assignedEmployee.cost;

    // Subtract equipment rental cost (if not owned)
    if (!job.assignedEquipment.owned) {
      dailyCost += job.assignedEquipment.cost;
    }
  }

  GameState.money -= dailyCost;

  // Check for consequences to deliver
  deliverConsequences();

  // Update office level
  updateOfficeLevel();

  // Update family status
  updateFamilyStatus();

  // Generate new mail
  generateMail();

  // Advance day
  GameState.day++;
  GameState.isFirstDay = false;

  // Generate new jobs for tomorrow
  generateDailyJobs();

  // Clear selections
  GameState.selectedJobs = [];
}

// Deliver consequences that are due
function deliverConsequences() {
  const toDeliver = GameState.pendingConsequences.filter(c => c.deliveryDay <= GameState.day && !c.delivered);

  for (const consequence of toDeliver) {
    consequence.delivered = true;
    GameState.displayedConsequences.push(consequence);
  }

  // Keep only last 10 displayed consequences
  if (GameState.displayedConsequences.length > 10) {
    GameState.displayedConsequences = GameState.displayedConsequences.slice(-10);
  }
}

// Update office level based on progression
function updateOfficeLevel() {
  for (let i = OFFICE_UPGRADES.length - 1; i >= 0; i--) {
    const upgrade = OFFICE_UPGRADES[i];
    if (GameState.successfulRepos >= upgrade.requiredRepos && GameState.totalEarned >= upgrade.requiredMoney) {
      GameState.officeLevel = upgrade.level;
      break;
    }
  }
}

// Update family status based on progression
function updateFamilyStatus() {
  let newStatus = 'together';
  let newAct = 1;

  if (GameState.day > 60 || GameState.successfulRepos > 50) {
    newStatus = 'divorced';
    newAct = 3;
  } else if (GameState.day > 30 || GameState.successfulRepos > 25) {
    newStatus = 'separated';
    newAct = 2;
  } else if (GameState.day > 20 || GameState.successfulRepos > 15) {
    newStatus = 'strained';
  }

  GameState.familyStatus = newStatus;
  GameState.act = newAct;

  // Update family message
  const messages = FAMILY_MESSAGES[newStatus];
  GameState.currentFamilyMessage = messages[Math.floor(Math.random() * messages.length)];
}

// Generate mail for current act
function generateMail() {
  let mailPool = [];
  if (GameState.act === 1) {
    mailPool = MAIL_ITEMS.act1;
  } else if (GameState.act === 2) {
    mailPool = MAIL_ITEMS.act2;
  } else {
    mailPool = MAIL_ITEMS.act3;
  }

  // Select 2-3 random mail items
  const count = Math.floor(Math.random() * 2) + 2;
  GameState.currentMail = [];

  for (let i = 0; i < count && i < mailPool.length; i++) {
    const item = mailPool[Math.floor(Math.random() * mailPool.length)];
    if (!GameState.currentMail.find(m => m.text === item.text)) {
      GameState.currentMail.push(item);
    }
  }
}

// Save game to localStorage
function saveGame() {
  try {
    localStorage.setItem('possessionSave', JSON.stringify(GameState));
    return true;
  } catch (e) {
    console.error('Failed to save game:', e);
    return false;
  }
}

// Load game from localStorage
function loadGame() {
  try {
    const saved = localStorage.getItem('possessionSave');
    if (saved) {
      const loaded = JSON.parse(saved);
      Object.assign(GameState, loaded);
      return true;
    }
  } catch (e) {
    console.error('Failed to load game:', e);
  }
  return false;
}

// Reset game
function resetGame() {
  localStorage.removeItem('possessionSave');

  // Reset state
  GameState.money = 1500;
  GameState.day = 1;
  GameState.act = 1;
  GameState.successfulRepos = 0;
  GameState.totalEarned = 0;
  GameState.complaintsReceived = 0;
  GameState.failedRepos = 0;
  GameState.officeLevel = 0;
  GameState.familyStatus = 'together';
  GameState.employees = [];
  GameState.equipment = [];
  GameState.availableJobs = [];
  GameState.selectedJobs = [];
  GameState.dayResults = [];
  GameState.pendingConsequences = [];
  GameState.displayedConsequences = [];
  GameState.currentFamilyMessage = '';
  GameState.currentMail = [];
  GameState.isFirstDay = true;

  initGame();
}

// Get available employees (not currently assigned)
function getAvailableEmployees() {
  const assignedIds = GameState.selectedJobs
    .filter(j => j.assignedEmployee)
    .map(j => j.assignedEmployee.id);

  return GameState.employees.filter(e => !assignedIds.includes(e.id));
}

// Get available equipment (not currently assigned, or owned)
function getAvailableEquipment() {
  const assignedIds = GameState.selectedJobs
    .filter(j => j.assignedEquipment && !j.assignedEquipment.owned)
    .map(j => j.assignedEquipment.id);

  return GameState.equipment.filter(e => e.owned || !assignedIds.includes(e.id));
}

// Calculate daily costs
function calculateDailyCosts() {
  let total = 0;
  for (const job of GameState.selectedJobs) {
    if (job.assignedEmployee) {
      total += job.assignedEmployee.cost;
    }
    if (job.assignedEquipment && !job.assignedEquipment.owned) {
      total += job.assignedEquipment.cost;
    }
  }
  return total;
}

// Get difficulty stars
function getDifficultyStars(difficulty) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= difficulty ? '★' : '☆';
  }
  return stars;
}

// Check if can hire more employees
function canHireEmployee() {
  return GameState.officeLevel >= 3 && GameState.money >= 500;
}

// Hire employee
function hireEmployee(employeeId) {
  const hireable = EMPLOYEES.hireable.find(e => e.id === employeeId);
  if (hireable && !GameState.employees.find(e => e.id === employeeId)) {
    GameState.employees.push({...hireable});
    return true;
  }
  return false;
}

// Purchase equipment
function purchaseEquipment(equipmentId) {
  const purchaseable = EQUIPMENT.purchaseable.find(e => e.id === equipmentId);
  if (purchaseable && !GameState.equipment.find(e => e.id === equipmentId)) {
    if (GameState.money >= purchaseable.cost) {
      const newEquip = {...purchaseable, owned: true};
      GameState.equipment.push(newEquip);
      GameState.money -= purchaseable.cost;
      return true;
    }
  }
  return false;
}
