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
    "Maya wants to show you her drawing when you get home",
    "Dinner at 7?",
    "Don't forget we have plans this weekend",
    "Maya got an A on her test!",
    "Hope work is going well"
  ],
  strained: [
    "Working late again?",
    "ok",
    "fine",
    "Maya asked when you're coming home",
    "We need to talk",
    "You missed dinner again",
    "Are you even reading these?"
  ],
  separated: [
    "Maya's recital was today.",
    "Forgot to call on her birthday?",
    "Lawyer wants to schedule a call",
    "Please just sign the papers",
    "Maya asks about you",
    "Child support payment received",
    "Forwarding: Maya's school event"
  ],
  divorced: [
    "Forwarding: Medical bill for Maya",
    "Child support due Friday",
    "Maya's school schedule attached",
    "Please confirm pickup time",
    ".",
    "Payment received"
  ]
};

const MAIL_ITEMS = {
  act1: [
    { type: 'bill', text: 'Electric Bill: $85' },
    { type: 'bill', text: 'Water Bill: $45' },
    { type: 'bill', text: 'Internet Bill: $60' },
    { type: 'bill', text: 'Car Insurance: $120' }
  ],
  act2: [
    { type: 'bill', text: 'Electric Bill: $85' },
    { type: 'bill', text: 'Medical Bill: $850' },
    { type: 'legal', text: 'Legal Notice: Custody Hearing' },
    { type: 'bill', text: 'Car Insurance: $120' }
  ],
  act3: [
    { type: 'legal', text: 'Divorce Papers (Final)' },
    { type: 'bill', text: 'Child Support: $800/mo' },
    { type: 'bill', text: 'Apartment Rent: $950' },
    { type: 'bill', text: 'Car Insurance: $120' }
  ]
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMPLOYEES, EQUIPMENT, JOB_TEMPLATES, STREETS, OFFICE_UPGRADES, FAMILY_MESSAGES, MAIL_ITEMS };
}
