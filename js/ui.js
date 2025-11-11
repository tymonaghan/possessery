// POSSESSION - UI Rendering

// Current view state
let currentView = 'home'; // home, jobs, results
let currentTutorialStep = 0;
let tutorialCompleted = false;

// Initialize UI
function initUI() {
  // Try to load saved game
  const loaded = loadGame();
  if (loaded) {
    console.log('Loaded saved game');
    tutorialCompleted = true; // Skip tutorial for loaded games
    renderView('home');
  } else {
    initGame();
    tutorialCompleted = false;
    // Show name selection for new games
    showNameSelection();
  }

  // Set up event listeners
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  // Navigation buttons
  document.getElementById('btn-start-day').addEventListener('click', () => {
    renderView('jobs');
  });

  document.getElementById('btn-go-to-work').addEventListener('click', () => {
    if (GameState.selectedJobs.length > 0) {
      executeDay();
      renderView('results');
    } else {
      alert('Select at least one job!');
    }
  });

  document.getElementById('btn-continue-evening').addEventListener('click', () => {
    saveGame();
    renderView('home');
  });

  document.getElementById('btn-back-to-home').addEventListener('click', () => {
    renderView('home');
  });

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset? This will delete your save.')) {
      resetGame();
      tutorialCompleted = false;
      currentTutorialStep = 0;
      showTutorial();
    }
  });

  // Tutorial next button
  document.getElementById('btn-tutorial-next').addEventListener('click', () => {
    nextTutorialStep();
  });

  // Name selection continue button
  document.getElementById('btn-name-continue').addEventListener('click', () => {
    submitNames();
  });
}

// Show name selection modal
function showNameSelection() {
  document.getElementById('name-modal').classList.remove('hidden');
}

// Hide name selection modal
function hideNameSelection() {
  document.getElementById('name-modal').classList.add('hidden');
}

// Submit names from form
function submitNames() {
  const playerName = document.getElementById('player-name').value.trim() || 'Sam';
  const spouseName = document.getElementById('spouse-name').value.trim() || 'Alex';
  const childName = document.getElementById('child-name').value.trim() || 'Maya';

  GameState.playerName = playerName;
  GameState.spouseName = spouseName;
  GameState.childName = childName;

  // Update messages with new names
  updateFamilyStatus();
  updateRickyMessage();

  hideNameSelection();
  showTutorial();
}

// Show tutorial modal
function showTutorial() {
  currentTutorialStep = 0;
  document.getElementById('tutorial-modal').classList.remove('hidden');
  renderTutorialStep();
}

// Hide tutorial modal
function hideTutorial() {
  document.getElementById('tutorial-modal').classList.add('hidden');
  tutorialCompleted = true;
  renderView('home');
}

// Render current tutorial step
function renderTutorialStep() {
  const step = TUTORIAL_STEPS[currentTutorialStep];
  const stepEl = document.getElementById('tutorial-step');
  const btnEl = document.getElementById('btn-tutorial-next');

  let html = `<h2>${step.title}</h2>`;
  html += `<p>${step.content}</p>`;
  html += `<div class="tutorial-progress">Step ${currentTutorialStep + 1} of ${TUTORIAL_STEPS.length}</div>`;

  stepEl.innerHTML = html;

  // Update button text for last step
  if (currentTutorialStep === TUTORIAL_STEPS.length - 1) {
    btnEl.textContent = "LET'S GO! →";
  } else {
    btnEl.textContent = "NEXT →";
  }
}

// Advance to next tutorial step
function nextTutorialStep() {
  currentTutorialStep++;

  if (currentTutorialStep >= TUTORIAL_STEPS.length) {
    hideTutorial();
  } else {
    renderTutorialStep();
  }
}

// Render current view
function renderView(view) {
  currentView = view;

  // Hide all views
  document.getElementById('home-view').classList.add('hidden');
  document.getElementById('jobs-view').classList.add('hidden');
  document.getElementById('results-view').classList.add('hidden');

  // Show selected view
  if (view === 'home') {
    renderHomeView();
    document.getElementById('home-view').classList.remove('hidden');
  } else if (view === 'jobs') {
    renderJobsView();
    document.getElementById('jobs-view').classList.remove('hidden');
  } else if (view === 'results') {
    renderResultsView();
    document.getElementById('results-view').classList.remove('hidden');
  }
}

// Render home/office view
function renderHomeView() {
  // Update header
  document.getElementById('home-day').textContent = `Day ${GameState.day}`;
  document.getElementById('home-money').textContent = `$${GameState.money.toLocaleString()}`;

  // Render office
  renderOffice();

  // Render messages
  renderMessages();

  // Render consequences
  renderConsequences();
}

// Render office visual
function renderOffice() {
  const office = OFFICE_UPGRADES[GameState.officeLevel];
  const officeEl = document.getElementById('office-visual');
  const officeSectionEl = document.querySelector('.office-section');

  // Update office section class for background image
  if (officeSectionEl) {
    officeSectionEl.className = `office-section office-level-${GameState.officeLevel}`;
  }

  let html = `<div>`;
  html += `<h3>${office.name}</h3>`;
  html += `<p class="office-description">${office.description}</p>`;
  html += `<ul class="office-items">`;

  for (const item of office.items) {
    // Special styling for family photo based on status
    if (item.includes('Family photo')) {
      let photoClass = 'photo-normal';
      if (GameState.familyStatus === 'strained') photoClass = 'photo-faded';
      if (GameState.familyStatus === 'separated') photoClass = 'photo-facedown';
      if (GameState.familyStatus === 'divorced') photoClass = 'photo-empty';

      html += `<li class="${photoClass}">${item}</li>`;
    } else if (item.includes('Empty frame')) {
      html += `<li class="photo-empty">${item}</li>`;
    } else {
      html += `<li>${item}</li>`;
    }
  }

  html += `</ul>`;
  html += `</div>`;

  officeEl.innerHTML = html;
}

// Render messages (texts and mail)
function renderMessages() {
  // Ricky messages
  const rickyEl = document.getElementById('ricky-messages');
  let rickyHtml = `<h4>📱 Cousin Ricky</h4>`;
  rickyHtml += `<div class="message message-ricky">${GameState.currentRickyMessage}</div>`;
  rickyEl.innerHTML = rickyHtml;

  // Family messages
  const messagesEl = document.getElementById('family-messages');
  let html = `<h4>📱 ${GameState.spouseName || 'Alex'}</h4>`;

  if (GameState.familyStatus === 'divorced') {
    html += `<div class="message message-cold">${GameState.currentFamilyMessage}</div>`;
  } else if (GameState.familyStatus === 'separated') {
    html += `<div class="message message-distant">${GameState.currentFamilyMessage}</div>`;
  } else if (GameState.familyStatus === 'strained') {
    html += `<div class="message message-strained">${GameState.currentFamilyMessage}</div>`;
  } else {
    html += `<div class="message message-warm">${GameState.currentFamilyMessage}</div>`;
  }

  messagesEl.innerHTML = html;

  // Mail
  const mailEl = document.getElementById('mail');
  html = `<h4>Mail</h4>`;

  for (const item of GameState.currentMail) {
    const itemClass = item.type === 'legal' ? 'mail-legal' : 'mail-bill';
    html += `<div class="mail-item ${itemClass}">• ${item.text}</div>`;
  }

  mailEl.innerHTML = html;
}

// Render consequences
function renderConsequences() {
  const consequencesEl = document.getElementById('consequences');

  if (GameState.displayedConsequences.length === 0) {
    consequencesEl.innerHTML = '<p class="no-consequences">No news today...</p>';
    return;
  }

  let html = '<h4>Recent News</h4>';

  // Show last 3 consequences
  const recent = GameState.displayedConsequences.slice(-3).reverse();

  for (const consequence of recent) {
    html += `<div class="consequence">`;
    html += `<div class="consequence-source">${consequence.source}:</div>`;
    html += `<div class="consequence-text">${consequence.text}</div>`;
    html += `</div>`;
  }

  consequencesEl.innerHTML = html;
}

// Render jobs view
function renderJobsView() {
  document.getElementById('jobs-day').textContent = `Day ${GameState.day}`;

  const jobsListEl = document.getElementById('jobs-list');
  const isSolo = GameState.employees.length === 0;
  let html = '';

  for (const job of GameState.availableJobs) {
    const isSelected = GameState.selectedJobs.includes(job);
    const isFullyAssigned = isSolo ? job.assignedEquipment : (job.assignedEmployee && job.assignedEquipment);

    html += `<div class="job-card ${isSelected ? 'job-selected' : ''}" data-job-id="${job.id}">`;
    html += `<div class="job-header">`;
    html += `<input type="checkbox" class="job-checkbox" data-job-id="${job.id}" ${isSelected ? 'checked' : ''}>`;
    html += `<div class="job-title">`;
    html += `<div class="job-vehicle">${job.vehicle.description}</div>`;
    html += `<div class="job-debtor">${job.debtor.name} - ${job.debtor.address}</div>`;
    html += `</div>`;
    html += `</div>`;

    html += `<div class="job-details">`;
    html += `<span>Debt: $${Math.floor(job.debt.amount).toLocaleString()}</span>`;
    html += `<span>${job.debt.monthsDelinquent} months behind</span>`;
    html += `</div>`;

    html += `<div class="job-stats">`;
    html += `<span>Difficulty: ${getDifficultyStars(job.difficulty)}</span>`;
    html += `<span class="job-payout">Payout: $${job.payout}</span>`;
    html += `</div>`;

    if (isSelected) {
      html += `<div class="job-assignment">`;

      // Only show employee dropdown if we have employees
      if (!isSolo) {
        html += `<select class="employee-select" data-job-id="${job.id}">`;
        html += `<option value="">Select Employee</option>`;

        const availableEmployees = getAvailableEmployees();
        // Add currently assigned employee even if not available
        if (job.assignedEmployee) {
          availableEmployees.push(job.assignedEmployee);
        }

        for (const emp of availableEmployees) {
          const selected = job.assignedEmployee && job.assignedEmployee.id === emp.id ? 'selected' : '';
          html += `<option value="${emp.id}" ${selected}>${emp.name} (${emp.skill}, $${emp.cost}/day)</option>`;
        }
        html += `</select>`;
      } else {
        // Solo operator - show "You" as operator
        html += `<div class="solo-operator">👤 You (Solo Operator)</div>`;
      }

      // Equipment dropdown
      html += `<select class="equipment-select" data-job-id="${job.id}">`;
      html += `<option value="">Select Equipment</option>`;

      const availableEquipment = getAvailableEquipment();
      // Add currently assigned equipment even if not available
      if (job.assignedEquipment) {
        availableEquipment.push(job.assignedEquipment);
      }

      for (const equip of availableEquipment) {
        const selected = job.assignedEquipment && job.assignedEquipment.id === equip.id ? 'selected' : '';
        const costText = equip.owned ? 'owned' : `$${equip.cost}/day`;
        html += `<option value="${equip.id}" ${selected}>${equip.name} (+${Math.floor(equip.bonus * 100)}%, ${costText})</option>`;
      }
      html += `</select>`;

      html += `</div>`;
    }

    html += `</div>`;
  }

  jobsListEl.innerHTML = html;

  // Update footer
  updateJobsFooter();

  // Add event listeners for checkboxes and dropdowns
  setupJobsEventListeners();
}

// Setup event listeners for jobs view
function setupJobsEventListeners() {
  // Checkboxes
  document.querySelectorAll('.job-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const jobId = e.target.dataset.jobId;
      const job = GameState.availableJobs.find(j => j.id === jobId);
      const isSolo = GameState.employees.length === 0;
      const maxJobs = isSolo ? 1 : 4;

      if (e.target.checked) {
        if (GameState.selectedJobs.length < maxJobs) {
          GameState.selectedJobs.push(job);
        } else {
          e.target.checked = false;
          if (isSolo) {
            alert('As a solo operator, you can only handle 1 job per day!');
          } else {
            alert('You can only select up to 4 jobs per day!');
          }
        }
      } else {
        const index = GameState.selectedJobs.indexOf(job);
        if (index > -1) {
          // Clear assignments
          job.assignedEmployee = null;
          job.assignedEquipment = null;
          GameState.selectedJobs.splice(index, 1);
        }
      }

      renderJobsView();
    });
  });

  // Employee dropdowns
  document.querySelectorAll('.employee-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const jobId = e.target.dataset.jobId;
      const employeeId = e.target.value;
      const job = GameState.selectedJobs.find(j => j.id === jobId);

      if (employeeId) {
        const employee = GameState.employees.find(emp => emp.id === employeeId);
        job.assignedEmployee = employee;
      } else {
        job.assignedEmployee = null;
      }

      updateJobsFooter();
    });
  });

  // Equipment dropdowns
  document.querySelectorAll('.equipment-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const jobId = e.target.dataset.jobId;
      const equipmentId = e.target.value;
      const job = GameState.selectedJobs.find(j => j.id === jobId);

      if (equipmentId) {
        const equipment = GameState.equipment.find(eq => eq.id === equipmentId);
        job.assignedEquipment = equipment;
      } else {
        job.assignedEquipment = null;
      }

      updateJobsFooter();
    });
  });
}

// Update jobs view footer
function updateJobsFooter() {
  const selectedCount = GameState.selectedJobs.length;
  const dailyCosts = calculateDailyCosts();
  const isSolo = GameState.employees.length === 0;

  // Solo operators only need equipment, employees need both employee and equipment
  const fullyAssigned = isSolo
    ? GameState.selectedJobs.filter(j => j.assignedEquipment).length
    : GameState.selectedJobs.filter(j => j.assignedEmployee && j.assignedEquipment).length;

  document.getElementById('selected-count').textContent = selectedCount;
  document.getElementById('daily-costs').textContent = `$${dailyCosts}`;

  // Update hint text
  const hintEl = document.querySelector('.footer-hint');
  if (isSolo) {
    hintEl.textContent = 'Select 1 job (solo operator)';
  } else {
    hintEl.textContent = 'Select 1-4 jobs for today';
  }

  const goButton = document.getElementById('btn-go-to-work');
  if (fullyAssigned === selectedCount && selectedCount > 0) {
    goButton.disabled = false;
  } else {
    goButton.disabled = true;
  }
}

// Render results view
function renderResultsView() {
  const resultsListEl = document.getElementById('results-list');
  let html = '';

  let totalEarned = 0;
  let successCount = 0;

  for (const result of GameState.dayResults) {
    const statusClass = result.success ? 'result-success' : 'result-failure';
    const statusIcon = result.success ? '✓' : '✗';
    const statusText = result.success ? 'SUCCESS' : 'FAILED';

    html += `<div class="result-card ${statusClass}">`;
    html += `<div class="result-header">`;
    html += `<span class="result-icon">${statusIcon}</span>`;
    html += `<span class="result-status">${statusText}</span>`;
    html += `<span class="result-vehicle">${result.vehicle.description}</span>`;
    html += `</div>`;

    html += `<div class="result-details">`;
    html += `<div class="result-debtor">${result.debtor.name} - ${result.debtor.address}</div>`;
    html += `<div class="result-team">Employee: ${result.employee} | Equipment: ${result.equipment}</div>`;
    html += `<div class="result-message">${result.message}</div>`;
    html += `</div>`;

    html += `<div class="result-payout">`;
    html += `Earned: <strong>$${result.payout.toLocaleString()}</strong>`;
    html += `</div>`;

    html += `</div>`;

    if (result.success) {
      totalEarned += result.payout;
      successCount++;
    }
  }

  resultsListEl.innerHTML = html;

  // Update summary
  const dailyCosts = calculateDailyCosts();
  const netProfit = totalEarned - dailyCosts;

  document.getElementById('total-earned').textContent = `$${totalEarned.toLocaleString()}`;
  document.getElementById('overhead-costs').textContent = `-$${dailyCosts}`;
  document.getElementById('net-profit').textContent = `$${netProfit.toLocaleString()}`;
  document.getElementById('success-rate').textContent = `${successCount}/${GameState.dayResults.length}`;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  initUI();
});
