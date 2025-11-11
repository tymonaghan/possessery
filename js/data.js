// POSSESSION - Game Data
// Job templates, employees, equipment, and consequence templates

const EMPLOYEES = {
  starter: [
    {
      id: 'mike',
      name: 'Mike Thompson',
      skill: 'negotiator',
      skillLevel: 2,
      cost: 50,
      available: true
    },
    {
      id: 'sarah',
      name: 'Sarah Chen',
      skill: 'investigator',
      skillLevel: 2,
      cost: 50,
      available: true
    }
  ],
  hireable: [
    {
      id: 'jake',
      name: 'Jake Rivera',
      skill: 'intimidator',
      skillLevel: 3,
      cost: 100,
      available: true
    },
    {
      id: 'emma',
      name: 'Emma Walsh',
      skill: 'investigator',
      skillLevel: 4,
      cost: 120,
      available: true
    }
  ]
};

const EQUIPMENT = {
  starter: [
    {
      id: 'basic_truck',
      name: 'Basic Tow Truck',
      bonus: 0.05,
      cost: 0,
      owned: true
    }
  ],
  purchaseable: [
    {
      id: 'lockpick',
      name: 'Lockpick Kit',
      bonus: 0.10,
      cost: 500,
      owned: false
    },
    {
      id: 'gps_tracker',
      name: 'GPS Tracker',
      bonus: 0.15,
      cost: 1000,
      owned: false
    },
    {
      id: 'flatbed',
      name: 'Professional Flatbed',
      bonus: 0.20,
      cost: 2500,
      owned: false
    }
  ]
};

const JOB_TEMPLATES = {
  single_mom: {
    type: 'single_mom',
    difficulty: 3,
    vehicles: ['2015 Honda Odyssey', '2018 Toyota Sienna', '2014 Dodge Caravan'],
    debtRange: [12000, 18000],
    payoutMultiplier: 0.06,
    requiredSkill: 'negotiator',
    names: ['Sarah Martinez', 'Jennifer Wilson', 'Maria Garcia', 'Lisa Thompson'],
    successMessage: 'Vehicle recovered. Debtor was distraught, children present. No complications.',
    failureMessage: 'Debtor pleaded, showed payment proof. Decided to walk away and verify with creditor.',
    consequences: {
      success: [
        "Sheriff's Report: Local family loses transportation on {street}",
        "Facebook: 'Neighbor got their car taken, so sad, they have kids'",
        "Overheard at diner: 'Did you hear about {name}? Lost that job interview...'"
      ],
      failure: [
        "Creditor memo: 'Need better completion rates - too many walk-aways'"
      ]
    }
  },

  vin_mismatch: {
    type: 'vin_mismatch',
    difficulty: 4,
    vehicles: ['2017 Ford Fusion', '2016 Chevy Malibu', '2019 Nissan Altima'],
    debtRange: [8000, 15000],
    payoutMultiplier: 0.05,
    requiredSkill: 'investigator',
    names: ['John Smith', 'David Brown', 'Robert Lee', 'James Anderson'],
    successMessage: 'Verified VIN after delay. Vehicle recovered.',
    failureMessage: "VIN didn't match paperwork. Investigated and walked away to avoid lawsuit.",
    consequences: {
      success: [
        "Creditor email: 'Good work on the VIN verification - bonus attached'"
      ],
      failure: [
        "Good call - creditor confirms VIN error in their system. Lawsuit avoided."
      ]
    }
  },

  wrong_address: {
    type: 'wrong_address',
    difficulty: 4,
    vehicles: ['2018 Ford F-150', '2017 Chevy Silverado', '2016 Ram 1500'],
    debtRange: [15000, 25000],
    payoutMultiplier: 0.055,
    requiredSkill: 'investigator',
    names: ['Michael Johnson', 'Chris Davis', 'Brian Miller', 'Kevin Moore'],
    successMessage: 'Debtor claimed mistake. Verified records and recovered vehicle.',
    failureMessage: 'Debtor showed payment records. Creditor error confirmed - walked away.',
    consequences: {
      success: [
        "Legal notice: Wrongful repossession lawsuit filed by {name}",
        "Creditor: 'Investigating complaint - may have been creditor error'"
      ],
      failure: [
        "Avoided lawsuit - creditor apologizes for wrong address in system"
      ]
    }
  },

  medical_debt: {
    type: 'medical_debt',
    difficulty: 2,
    vehicles: ['2010 Honda Civic', '2012 Toyota Corolla', '2011 Ford Focus'],
    debtRange: [5000, 8000],
    payoutMultiplier: 0.07,
    requiredSkill: 'negotiator',
    names: ['Patricia White', 'Richard Harris', 'Nancy Clark', 'Thomas Lewis'],
    successMessage: 'Vehicle recovered. Medical bills visible in car. Debtor not present.',
    failureMessage: 'Debtor explained medical situation. Decided to give them more time.',
    consequences: {
      success: [
        "Facebook: 'Friend\\'s dad lost his car, just got out of hospital'",
        "Local news: 'Medical bankruptcy cases rise in county'",
        "Overheard: 'They took his car while he was recovering...'"
      ],
      failure: [
        "Creditor: 'Too many delays on medical cases - hurting our numbers'"
      ]
    }
  },

  livelihood: {
    type: 'livelihood',
    difficulty: 3,
    vehicles: ['2014 Ford Transit Van', '2015 Chevy Express Van', '2013 Ford E-350'],
    debtRange: [10000, 16000],
    payoutMultiplier: 0.06,
    requiredSkill: 'negotiator',
    names: ['Carlos Rodriguez', 'Mike Sullivan', 'Tony Marino', 'Dave Peterson'],
    successMessage: 'Work van recovered. Tools inventoried and secured.',
    failureMessage: 'Debtor pleaded - van is his livelihood. Chose to give extension.',
    consequences: {
      success: [
        "Overheard: 'That contractor shut down, couldn\\'t work without his van'",
        "NextDoor: 'Anyone know a plumber? {name} went out of business'",
        "Local news: 'Small business closures up this quarter'"
      ],
      failure: [
        "Creditor: 'Extensions cost us money - stick to the contract'"
      ]
    }
  },

  voluntary: {
    type: 'voluntary',
    difficulty: 1,
    vehicles: ['2016 Kia Optima', '2015 Hyundai Sonata', '2017 Mazda 6'],
    debtRange: [8000, 12000],
    payoutMultiplier: 0.05,
    requiredSkill: 'negotiator',
    names: ['Amy Chen', 'Mark Johnson', 'Susan Wright', 'Paul Green'],
    successMessage: 'Debtor cooperated fully. Clean, easy recovery.',
    failureMessage: 'Debtor wanted to surrender but vehicle not at listed location.',
    consequences: {
      success: [],
      failure: []
    }
  },

  luxury: {
    type: 'luxury',
    difficulty: 2,
    vehicles: ['2019 BMW 3-Series', '2018 Mercedes C-Class', '2020 Lexus ES'],
    debtRange: [25000, 40000],
    payoutMultiplier: 0.04,
    requiredSkill: 'investigator',
    names: ['Alexander Hunt', 'Victoria Stone', 'Bradley Cooper', 'Samantha Price'],
    successMessage: 'High-value vehicle recovered from secured parking. Clean repo.',
    failureMessage: 'Vehicle location secured - unable to access without causing damage.',
    consequences: {
      success: [
        "Creditor bonus: +$500 efficiency payment for luxury recovery",
        "Performance email: 'Excellent work on high-value asset recovery'"
      ],
      failure: []
    }
  },

  elderly: {
    type: 'elderly',
    difficulty: 2,
    vehicles: ['2008 Buick LeSabre', '2010 Mercury Grand Marquis', '2009 Cadillac DTS'],
    debtRange: [4000, 7000],
    payoutMultiplier: 0.08,
    requiredSkill: 'negotiator',
    names: ['Dorothy Evans', 'Harold Phillips', 'Ethel Cooper', 'Walter Jenkins'],
    successMessage: 'Debtor confused, elderly. Vehicle recovered without incident.',
    failureMessage: 'Debtor clearly confused about situation. Chose to contact creditor first.',
    consequences: {
      success: [
        "Sheriff\\'s Report: Senior citizen without transportation for medical appointments",
        "Local news: 'Elder advocates warn of predatory lending'",
        "Social worker post: 'Client lost independence after car repossession'"
      ],
      failure: [
        "Creditor: 'These cases are low value - just complete them'"
      ]
    }
  },

  hostile: {
    type: 'hostile',
    difficulty: 5,
    vehicles: ['2016 Dodge Charger', '2017 Ford Mustang', '2015 Chevy Camaro'],
    debtRange: [12000, 20000],
    payoutMultiplier: 0.07,
    requiredSkill: 'intimidator',
    names: ['Derek Mason', 'Troy Barrett', 'Marcus Webb', 'Shane Griffin'],
    successMessage: 'Police standby required. Vehicle recovered after tense confrontation.',
    failureMessage: 'Situation too dangerous. Aborted for safety - will try again later.',
    consequences: {
      success: [
        "Police report: Disturbance at repo scene on {street}",
        "Complaint filed against company by {name}",
        "Local news: 'Repo confrontation leads to arrest'"
      ],
      failure: [
        "Creditor: 'Need more aggressive tactics - competitors would have gotten it'"
      ]
    }
  },

  skip_trace: {
    type: 'skip_trace',
    difficulty: 4,
    vehicles: ['2015 Honda Accord', '2016 Toyota Camry', '2017 Nissan Maxima'],
    debtRange: [10000, 16000],
    payoutMultiplier: 0.065,
    requiredSkill: 'investigator',
    names: ['Jason Turner', 'Michelle Brooks', 'Ryan Foster', 'Ashley Coleman'],
    successMessage: 'Located vehicle after investigation. Recovered at workplace.',
    failureMessage: 'Unable to locate vehicle. Debtor has moved - address unknown.',
    consequences: {
      success: [
        "Overheard: 'They found {name}\\'s car at work - so embarrassing'",
        "Facebook: 'Can\\'t believe repo guys tracked me down...'"
      ],
      failure: [
        "Creditor: 'Invest in better skip-tracing tools - locate rate too low'"
      ]
    }
  }
};

const STREETS = [
  'Maple Street', 'Oak Avenue', 'Pine Road', 'Elm Street', 'Cedar Lane',
  'Birch Drive', 'Willow Court', 'Ash Boulevard', 'Cherry Street', 'Magnolia Way'
];

const OFFICE_UPGRADES = [
  {
    level: 0,
    name: 'Struggling',
    description: 'Folding table, old CRT monitor, flip phone',
    items: ['Folding table desk', 'Old CRT monitor', 'Flip phone', 'Fluorescent lighting', 'Family photo'],
    requiredRepos: 0,
    requiredMoney: 0
  },
  {
    level: 1,
    name: 'Getting Started',
    description: 'Basic desk, old monitor, basic phone',
    items: ['Metal desk', 'Old LCD monitor', 'Basic cell phone', 'Desk lamp', 'Family photo'],
    requiredRepos: 5,
    requiredMoney: 2000
  },
  {
    level: 2,
    name: 'Established',
    description: 'Decent desk, working monitor, smartphone',
    items: ['Wooden desk', 'LCD monitor', 'Smartphone', 'Coffee mug', 'Family photo'],
    requiredRepos: 10,
    requiredMoney: 5000
  },
  {
    level: 3,
    name: 'Professional',
    description: 'Nice desk, good monitor, new phone',
    items: ['Nice desk with drawer', 'Good monitor', 'New smartphone', 'Coffee mug', 'Desk plant', 'Family photo (starting to fade)'],
    requiredRepos: 15,
    requiredMoney: 10000
  },
  {
    level: 4,
    name: 'Successful',
    description: 'Executive desk, dual monitors, latest phone',
    items: ['Executive desk', 'Dual monitors', 'Latest phone', 'Desk toys', 'Nice plant', 'Family photo (faded)'],
    requiredRepos: 20,
    requiredMoney: 18000
  },
  {
    level: 5,
    name: 'Thriving',
    description: 'Premium desk, multiple monitors, top tech',
    items: ['Premium desk', 'Dual large monitors', 'Premium phone', 'Desk toys', 'Modern plant', 'Family photo (face-down)'],
    requiredRepos: 26,
    requiredMoney: 25000
  },
  {
    level: 6,
    name: 'Corporate',
    description: 'Luxury desk, multi-monitor setup, cutting edge tech',
    items: ['Luxury executive desk', 'Triple monitors', 'Latest tech', 'Trophy', 'Designer plant', 'Family photo (face-down)'],
    requiredRepos: 35,
    requiredMoney: 35000
  },
  {
    level: 7,
    name: 'High Achiever',
    description: 'Top-tier office with all the trappings of success',
    items: ['Designer desk', 'Multi-monitor array', 'Premium tech', 'Multiple trophies', 'Designer decor', 'Empty frame'],
    requiredRepos: 45,
    requiredMoney: 50000
  },
  {
    level: 8,
    name: 'Elite',
    description: 'Corner office quality setup',
    items: ['Corner office desk', 'Massive monitor setup', 'All latest tech', 'Awards shelf', 'Premium decor', 'Empty frame'],
    requiredRepos: 60,
    requiredMoney: 75000
  },
  {
    level: 9,
    name: 'Executive',
    description: 'Everything you wanted, nothing you needed',
    items: ['Executive suite desk', 'Wall of monitors', 'Every gadget', 'Trophy wall', 'Sterile perfection', 'Empty frame (dusty)'],
    requiredRepos: 80,
    requiredMoney: 100000
  }
];

const FAMILY_MESSAGES = {
  together: [
    "How was your day?",
    "Love you",
    "{child} wants to show you her drawing when you get home",
    "Dinner at 7?",
    "Don't forget we have plans this weekend",
    "{child} got an A on her test!",
    "Hope work is going well"
  ],
  strained: [
    "Working late again?",
    "ok",
    "fine",
    "{child} asked when you're coming home",
    "We need to talk",
    "You missed dinner again",
    "Are you even reading these?"
  ],
  separated: [
    "{child}'s recital was today.",
    "Forgot to call on her birthday?",
    "Lawyer wants to schedule a call",
    "Please just sign the papers",
    "{child} asks about you",
    "Child support payment received",
    "Forwarding: {child}'s school event"
  ],
  divorced: [
    "Forwarding: Medical bill for {child}",
    "Child support due Friday",
    "{child}'s school schedule attached",
    "Please confirm pickup time",
    ".",
    "Payment received"
  ]
};

const RICKY_MESSAGES = {
  start: [
    "Hey {name}! Welcome to the biz. I know it ain't glamorous but trust me, there's money in this. You'll be fine!",
    "Yo {name}, Ricky here. First day! Don't worry too much about it. Just hook it up and drive away lol. You got this.",
    "What's up {name}! So glad you decided to give this a shot. Easiest money I ever made. Just remember - you're helping the bank, not hurting people. That's what I tell myself anyway 😅"
  ],
  solo: [
    "How you holding up {name}? Flying solo is tough but you're building something. Keep at it!",
    "Yo! Made any money yet? Remember, repo game is all about volume when you're solo. Get in, get out, get paid.",
    "You still doing this yourself? Damn {name}, you're tougher than I thought! But fr maybe think about hiring someone soon?",
    "Hey {name}, saw a sweet Camaro on the list today. Wish I could grab it but I'm slammed. You should jump on it!",
    "Coffee this weekend? Wanna hear how it's going. My treat!",
    "Just remember {name} - you're not the bad guy here. They stopped paying. You're just doing a job.",
    "Yo did you see that thing on the news? Wild. Anyway how's business?"
  ],
  growth: [
    "Yooo {name}! Heard you got employees now! Look at you, boss status! 💪",
    "Damn {name}, you're really building something here. I'm proud of you cuz!",
    "Hey big shot! Don't forget about your cousin Ricky when you make it big lol",
    "You hiring? Jk jk. But seriously you're killing it {name}!",
    "Remember when you were nervous about your first repo? Look at you now!"
  ],
  concern: [
    "Hey {name}... you doing okay? Been seeing you work a lot. Everything good at home?",
    "Yo just checking in. You seem stressed lately. Want to grab a beer?",
    "I know this job can be rough on relationships {name}. Just... take care of yourself okay?",
    "Not trying to pry but if you need to talk I'm here. Family first, even if it's just us cousins.",
    "Hey. Heard some stuff. You good? Hit me up if you need anything."
  ],
  general: [
    "What's up {name}! Just checking in. How's the repo life treating you?",
    "Yo! Got any good stories? This job always has crazy moments lol",
    "Hey {name}, you catch the game last night? Insane ending!",
    "Just wanted to say thanks for taking my advice on this gig. Glad it's working out!",
    "Yo {name} you around this weekend? BBQ at my place",
    "How's the family? Give them my best!",
    "Remember - cash is king baby! Keep grinding!"
  ]
};

const BILL_MESSAGES = {
  act1: [
    { sender: 'Electric Company', text: 'Your electric bill is due', amount: 85, paid: false },
    { sender: 'Water Dept', text: 'Water bill - payment required', amount: 45, paid: false },
    { sender: 'Internet Provider', text: 'Monthly internet service due', amount: 60, paid: false },
    { sender: 'Insurance Co', text: 'Car insurance premium due', amount: 120, paid: false },
    { sender: 'Gas Company', text: 'Natural gas bill enclosed', amount: 55, paid: false },
    { sender: 'Phone Company', text: 'Your phone bill is ready', amount: 75, paid: false }
  ],
  act2: [
    { sender: 'Electric Company', text: 'PAST DUE - Electric bill', amount: 85, paid: false },
    { sender: 'Medical Billing', text: 'Outstanding medical balance', amount: 850, paid: false },
    { sender: 'Law Office', text: 'Legal retainer required', amount: 500, paid: false },
    { sender: 'Insurance Co', text: 'Car insurance - URGENT', amount: 120, paid: false },
    { sender: 'Credit Card', text: 'Minimum payment due', amount: 250, paid: false },
    { sender: 'Landlord', text: 'Rent payment reminder', amount: 950, paid: false }
  ],
  act3: [
    { sender: 'Divorce Attorney', text: 'Final legal fees due', amount: 1200, paid: false },
    { sender: 'Child Support', text: 'Monthly child support payment', amount: 800, paid: false },
    { sender: 'Landlord', text: 'Apartment rent due', amount: 950, paid: false },
    { sender: 'Insurance Co', text: 'Car insurance premium', amount: 120, paid: false },
    { sender: 'Credit Card', text: 'OVERDUE - Pay immediately', amount: 450, paid: false },
    { sender: 'Electric Company', text: 'Disconnect notice', amount: 175, paid: false }
  ]
};

const LEGAL_MESSAGES = {
  act2: [
    { sender: 'Family Court', text: 'Custody hearing scheduled for next month', type: 'legal' },
    { sender: '{spouse}', text: 'Lawyer sent me the papers. Please look at them.', type: 'legal' }
  ],
  act3: [
    { sender: 'Family Court', text: 'Divorce finalized. Documents attached.', type: 'legal' },
    { sender: 'Child Services', text: 'Visitation schedule update', type: 'legal' }
  ]
};

const TUTORIAL_STEPS = [
  {
    title: "Welcome to POSSESSION",
    content: "Your cousin Ricky got you into the repo business. You're starting as a solo operator - just you, a tow truck, and whatever jobs you can handle. Times are tough, but there's money to be made."
  },
  {
    title: "How It Works",
    content: "Each day, you'll get repo jobs from creditors. Vehicles behind on payments that need to be recovered. As a solo operator, you can only handle <strong>1 job per day</strong>. Choose wisely!"
  },
  {
    title: "Selecting Your Job",
    content: "Pick the job that looks manageable. Each job shows the difficulty (★ rating) and potential payout. Higher difficulty = more money, but lower success chance. As you gain experience, you'll get better at this."
  },
  {
    title: "Equipment Matters",
    content: "Select your <strong>equipment</strong> for the job. You start with a basic tow truck. Better equipment increases your success rate. You can rent better gear or buy your own as you earn money."
  },
  {
    title: "Results & Growth",
    content: "Hit 'Go to Work' to start your day. You'll see if you succeeded or failed. Successful repos earn money (minus equipment rental costs). Save up to hire employees and expand!"
  },
  {
    title: "Build Your Empire",
    content: "Complete repos, earn money, hire employees, upgrade your office. Eventually you can hire staff and take on multiple jobs per day. But for now? It's just you. Good luck out there!"
  }
];

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMPLOYEES, EQUIPMENT, JOB_TEMPLATES, STREETS, OFFICE_UPGRADES, FAMILY_MESSAGES, RICKY_MESSAGES, BILL_MESSAGES, LEGAL_MESSAGES, TUTORIAL_STEPS };
}
