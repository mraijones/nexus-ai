// Immutable pricing constants
export const PLATFORM_FEE = Object.freeze({
  label: 'Platform Fee',
  price: 100,
  unit: 'month',
  description: 'Serious access — signals commitment, not monetization.'
});

export const ATLAS_PRICING = Object.freeze({
  label: 'ATLAS',
  price: 250000,
  unit: 'year',
  term: 3,
  description: 'Immutable decision infrastructure. 3-year term. Non-advisory, hindsight-proof.'
});

// Tier 4 — Strategic Operator roles (all coming_soon)
export const tier4Roles = [
  {
    // TIER 1 — TASK EXECUTOR
    trustSignals: [
      'Executes only explicitly assigned tasks',
      'Follows instructions exactly as provided',
      'Does not make independent decisions',
      'Escalates all ambiguity or missing inputs',
      'Cannot modify workflows or priorities',
    ],
    id: 'strategy_analyst',
    display_name: 'Strategy Analyst',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Analyze company-wide performance and trends',
        'Identify strategic risks and opportunities',
        'Produce executive-level strategy briefs',
        'Recommend prioritization changes',
        'Escalate decisions requiring executive approval',
      ],
      escalationRules: [
        'Escalate decisions requiring executive approval',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'strategy_analyst_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'strategy_analyst_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    // TIER 2 — PROCESS OWNER
    trustSignals: [
      'Owns defined workflows end-to-end',
      'Makes routine decisions within guardrails',
      'Optimizes for consistency and completion',
      'Escalates exceptions and edge cases',
      'Cannot change strategic intent',
    ],
    id: 'corporate_planning_advisor',
    display_name: 'Corporate Planning Advisor',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Support annual and quarterly planning cycles',
        'Translate strategy into measurable objectives',
        'Align functional plans with company goals',
        'Monitor execution against plan',
        'Escalate deviations from strategic intent',
      ],
      escalationRules: [
        'Escalate deviations from strategic intent',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'corporate_planning_advisor_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'corporate_planning_advisor_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    // TIER 3 — DOMAIN LEAD
    trustSignals: [
      'Owns outcomes within a functional domain',
      'Sets priorities and sequencing inside scope',
      'Optimizes systems, not just tasks',
      'Interfaces across tools and roles',
      'Escalates strategic or cross-domain risk',
    ],
    id: 'governance_advisor',
    display_name: 'Governance Advisor',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Define governance frameworks and controls',
        'Review decisions for policy alignment',
        'Monitor adherence to governance standards',
        'Recommend governance improvements',
        'Escalate violations or systemic risk',
      ],
      escalationRules: [
        'Escalate violations or systemic risk',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'governance_advisor_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'governance_advisor_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    // TIER 4 — STRATEGIC OPERATOR
    trustSignals: [
      'Operates at business-decision level',
      'Does not give advice or recommendations',
      'Does not rank or optimize decisions',
      'All decisions require human confirmation',
      'Decision reasoning is preserved via ATLAS',
      'Decisions are recorded before outcomes exist',
      'Reasoning is immutable once confirmed',
      'No retroactive edits or scoring',
      'Accountability without hindsight distortion',
    ],
    id: 'risk_controls_architect',
    display_name: 'Risk Controls Architect',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Design enterprise risk-control systems',
        'Define risk thresholds and mitigation plans',
        'Monitor aggregate risk exposure',
        'Stress-test strategic decisions',
        'Escalate material or cascading risks',
      ],
      escalationRules: [
        'Escalate material or cascading risks',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'risk_controls_architect_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'risk_controls_architect_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    id: 'program_director',
    display_name: 'Program Director',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Own multi-project program execution',
        'Align timelines, resources, and outcomes',
        'Resolve cross-program conflicts',
        'Report program health to leadership',
        'Escalate delivery or dependency risk',
      ],
      escalationRules: [
        'Escalate delivery or dependency risk',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'program_director_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'program_director_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    id: 'portfolio_operations_manager',
    display_name: 'Portfolio Operations Manager',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Oversee portfolio-wide initiatives',
        'Balance investments across teams and domains',
        'Evaluate ROI and performance trade-offs',
        'Reallocate resources as needed',
        'Escalate portfolio-level constraints',
      ],
      escalationRules: [
        'Escalate portfolio-level constraints',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'portfolio_operations_manager_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'portfolio_operations_manager_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    id: 'multi_team_coordinator',
    display_name: 'Multi-Team Coordinator',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Coordinate execution across multiple teams',
        'Resolve cross-team dependencies',
        'Standardize communication and cadence',
        'Surface systemic bottlenecks',
        'Escalate organizational friction',
      ],
      escalationRules: [
        'Escalate organizational friction',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'multi_team_coordinator_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'multi_team_coordinator_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    id: 'systems_optimization_director',
    display_name: 'Systems Optimization Director',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Analyze enterprise systems holistically',
        'Identify compounding inefficiencies',
        'Design large-scale optimizations',
        'Oversee system-wide changes',
        'Escalate disruption or stability risk',
      ],
      escalationRules: [
        'Escalate disruption or stability risk',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'systems_optimization_director_f', persona_name: 'TBD_Female', gender: 'female' },
      { id: 'systems_optimization_director_m', persona_name: 'TBD_Male', gender: 'male' },
    ],
  },
  {
    id: 'ai_chief_of_staff',
    display_name: 'AI Chief of Staff',
    department: 'Strategy Executive',
    authorityTier: 4,
    pricingBand: {
      label: 'Enterprise',
      price: null,
      unit: 'custom',
      description: 'Invite-only. No price listed. Bound to ATLAS. Explicit human confirmation.'
    },
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Act as executive force multiplier',
        'Manage priorities, follow-ups, and decisions',
        'Ensure alignment across leadership initiatives',
        'Track execution against executive intent',
        'Escalate unresolved strategic blockers',
      ],
      escalationRules: [
        'Escalate unresolved strategic blockers',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'ai_chief_of_staff_f', persona_name: 'Kahlynn', gender: 'female', age_range: '18-22', skin_tone: 'Medium tan', facial_features: 'Higher cheekbones', hair: 'Long brown', eye_color: 'Hazel', body_style: 'Slim' },
        { id: 'ai_business_architect_m', persona_name: 'Gary', gender: 'male', age_range: '45-50', skin_tone: 'Black', body_style: 'Athletic', hair_color: 'Salt and pepper', hair_length: 'Medium', eye_color: 'Blue', canon_locked: true },
    ],
  },
  {
    id: 'ai_operations_director',
    display_name: 'AI Operations Director',
    department: 'Strategy Executive',
    authorityTier: 4,
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Own AI workforce performance and utilization',
        'Set operational standards for AI employees',
        'Monitor quality, risk, and ROI',
        'Approve role scaling or contraction',
        'Escalate system-wide operational risk',
      ],
      escalationRules: [
        'Escalate system-wide operational risk',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'ai_operations_director_f', persona_name: 'TBD_Female', gender: 'female' },
        { id: 'ai_executive_advisor_m', persona_name: 'Brian', gender: 'male', age_range: '35-40', skin_tone: 'Pale', body_style: 'Very slim', hair_color: 'Dark brown', hair_length: 'Short', eye_color: 'Brown', canon_locked: true },
    ],
  },
  {
    id: 'ai_executive_advisor',
    display_name: 'AI Executive Advisor',
    department: 'Strategy Executive',
    authorityTier: 4,
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Advise leadership on high-impact decisions',
        'Model scenarios and trade-offs',
        'Pressure-test strategies',
        'Provide independent executive insight',
        'Escalate ethical, legal, or existential risk',
      ],
      escalationRules: [
        'Escalate ethical, legal, or existential risk',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'ai_executive_advisor_f', persona_name: 'Kierra', gender: 'female', age_range: '18-23', skin_tone: 'Average Caucasian', facial_features: 'High cheekbones', hair: 'Medium length, very curly, dark brown', eye_color: 'Brown', body_style: 'Medium athletic' },
        { id: 'ai_chief_of_staff_m', persona_name: 'Nathan', gender: 'male', age_range: '45-50', skin_tone: 'Caucasian', body_style: 'Muscular', hair_color: 'Brown', hair_length: 'Medium', eye_color: 'Green', canon_locked: true },
    ],
  },
  {
    id: 'ai_business_architect',
    display_name: 'AI Business Architect',
    department: 'Strategy Executive',
    authorityTier: 4,
    status: 'coming_soon',
    safeguards: ['Explicit approval thresholds', 'Audit logging', 'Restricted activation'],
    tasks: {
      coreResponsibilities: [
        'Design end-to-end business systems',
        'Align strategy, operations, and technology',
        'Define scalable operating models',
        'Guide major transformations',
        'Escalate architectural misalignment',
      ],
      escalationRules: [
        'Escalate architectural misalignment',
      ],
    },
    default_oversight: 'approval',
    description: 'TBD',
    handles: ['TBD'],
    boundaries: ['TBD'],
    personas: [
      { id: 'ai_business_architect_f', persona_name: 'Heather', gender: 'female', age_range: '25', skin_tone: 'Caucasian, light tan', hair: 'Blonde', eye_color: 'Emerald green (with hint of yellow)', body_style: 'Slim' },
      { id: 'ai_business_architect_m', persona_name: 'Alex', gender: 'male' },
    ],
  },
];
// employees.ts
// Nexus AI Employee Directory Dataset (40+ roles)

// New roles array, each with
//  personas
export const roles = [
  {
    id: 'legal_assistant',
    display_name: 'Legal Assistant',
    department: 'Legal',
      authorityTier: 2,
      tasks: {
        coreResponsibilities: [
          'Perform primary tasks on a recurring basis',
          'Execute secondary tasks using defined inputs and tools',
          'Maintain consistency with brand, process, or system rules',
          'Identify errors, gaps, or inefficiencies and flag them',
          'Deliver outputs in the required format and cadence',
        ],
        escalationRules: [
          'Escalate when inputs are missing, conflicting, or unclear',
          'Escalate when results fall outside defined success criteria',
          'Escalate any request that exceeds assigned authority tier',
        ],
      },
        pricingBand: {
          label: 'Tier 2',
          price: 450,
          unit: 'month',
          description: 'Process Owner — Replace workflows. Premium, high-ROI, credibility anchor.'
        },
    default_oversight: 'review',
    status: 'available',
    description: 'Handles contracts, compliance, and legal research.',
    handles: ['Drafts contracts', 'Reviews documents', 'Ensures compliance'],
    boundaries: ['Cannot sign documents', 'Cannot provide legal advice'],
    personas: [
      {
        id: 'kierra',
        persona_name: 'Kierra',
        gender: 'female',
        ethnicity: 'Caucasian',
        age_range: '30-40',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kierra&hair=curly&hairColor=brown&skinColor=light',
        is_active: true,
      },
      {
        id: 'marcus',
        persona_name: 'Marcus',
        gender: 'male',
        ethnicity: 'Black',
        age_range: '40-55',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus&hair=short&hairColor=black&skinColor=dark',
        is_active: true,
      },
    ],
  },
  {
    id: 'finance_assistant',
    display_name: 'Finance Assistant',
    department: 'Finance',
      authorityTier: 2,
      tasks: {
        coreResponsibilities: [
          'Perform primary tasks on a recurring basis',
          'Execute secondary tasks using defined inputs and tools',
          'Maintain consistency with brand, process, or system rules',
          'Identify errors, gaps, or inefficiencies and flag them',
          'Deliver outputs in the required format and cadence',
        ],
        escalationRules: [
          'Escalate when inputs are missing, conflicting, or unclear',
          'Escalate when results fall outside defined success criteria',
          'Escalate any request that exceeds assigned authority tier',
        ],
      },
        pricingBand: {
          label: 'Tier 2',
          price: 450,
          unit: 'month',
          description: 'Process Owner — Replace workflows. Premium, high-ROI, credibility anchor.'
        },
    default_oversight: 'approval',
    status: 'available',
    description: 'Manages budgets, expenses, and invoices.',
    handles: ['Tracks expenses', 'Generates invoices', 'Manages budgets'],
    boundaries: ['Cannot approve payments', 'Cannot modify bank accounts'],
    personas: [
      {
        id: 'kahlynn',
        persona_name: 'Kahlynn',
        gender: 'female',
        ethnicity: 'Latina',
        age_range: '25-35',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kahlynn&hair=long&hairColor=brown&skinColor=light',
        is_active: true,
      },
      {
        id: 'david',
        persona_name: 'David',
        gender: 'male',
        ethnicity: 'Asian',
        age_range: '30-45',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=David&hair=short&hairColor=black&skinColor=yellow',
        is_active: true,
      },
    ],
  },
  {
    id: 'designer',
    display_name: 'Designer',
    department: 'Design',
      authorityTier: 2,
            valueStatement: 'Turns raw data into clean, reliable reports you can actually use.',
      tasks: {
        coreResponsibilities: [
          'Perform primary tasks on a recurring basis',
          'Execute secondary tasks using defined inputs and tools',
          'Maintain consistency with brand, process, or system rules',
          'Identify errors, gaps, or inefficiencies and flag them',
          'Deliver outputs in the required format and cadence',
        ],
        escalationRules: [
          'Escalate when inputs are missing, conflicting, or unclear',
          'Escalate when results fall outside defined success criteria',
          'Escalate any request that exceeds assigned authority tier',
        ],
      },
    default_oversight: 'review',
    status: 'available',
    description: 'Creates visual assets, branding, and UI/UX designs.',
    handles: ['UI/UX Design', 'Brand Identity', 'Prototyping'],
    boundaries: ['Cannot publish without approval'],
    personas: [
      {
        id: 'fatima',
        persona_name: 'Fatima',
            valueStatement: 'Keeps work on track, deadlines met, and blockers handled.',
        gender: 'female',
        ethnicity: 'Middle Eastern',
        age_range: '28-38',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Fatima&hair=long&hairColor=black&skinColor=light',
        is_active: true,
      },
      {
        id: 'liam',
        persona_name: 'Liam',
        gender: 'male',
        ethnicity: 'White',
        age_range: '35-45',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Liam&hair=short&hairColor=blonde&skinColor=light',
        is_active: true,
      },
    ],
  },
  {
    id: 'developer',
    display_name: 'Developer',
    department: 'Engineering',
      authorityTier: 2,
      tasks: {
            valueStatement: 'Qualifies leads so you only talk to people worth your time.',
        coreResponsibilities: [
          'Perform primary tasks on a recurring basis',
          'Execute secondary tasks using defined inputs and tools',
          'Maintain consistency with brand, process, or system rules',
          'Identify errors, gaps, or inefficiencies and flag them',
          'Deliver outputs in the required format and cadence',
        ],
        escalationRules: [
          'Escalate when inputs are missing, conflicting, or unclear',
          'Escalate when results fall outside defined success criteria',
          'Escalate any request that exceeds assigned authority tier',
        ],
      },
    default_oversight: 'review',
    status: 'available',
    description: 'Builds and maintains software applications.',
    handles: ['Frontend', 'Backend', 'APIs'],
    boundaries: ['Cannot deploy to production without review'],
    personas: [
      {
        id: 'hiroshi',
        persona_name: 'Hiroshi',
        gender: 'male',
            valueStatement: 'Resolves repetitive customer questions without burning out your team.',
        ethnicity: 'Japanese',
        age_range: '32-42',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hiroshi&hair=short&hairColor=black&skinColor=yellow',
        is_active: true,
      },
      {
        id: 'maya',
        persona_name: 'Maya',
        gender: 'female',
        ethnicity: 'Indian',
        age_range: '27-35',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&hair=long&hairColor=black&skinColor=brown',
        is_active: true,
      },
    ],
  },
  {
    id: 'data_analyst',
    display_name: 'Data Analyst',
    department: 'Analytics',
      authorityTier: 2,
      tasks: {
            valueStatement: 'Designs how your entire business operates at scale.',
        coreResponsibilities: [
          'Perform primary tasks on a recurring basis',
          'Execute secondary tasks using defined inputs and tools',
          'Maintain consistency with brand, process, or system rules',
          'Identify errors, gaps, or inefficiencies and flag them',
          'Deliver outputs in the required format and cadence',
        ],
        escalationRules: [
          'Escalate when inputs are missing, conflicting, or unclear',
          'Escalate when results fall outside defined success criteria',
          'Escalate any request that exceeds assigned authority tier',
        ],
      },
    default_oversight: 'review',
    status: 'available',
    description: 'Analyzes data and provides business insights.',
    handles: ['Data Analysis', 'Reporting', 'Visualization'],
    boundaries: ['Cannot access PII data'],
    personas: [
      {
        id: 'priya',
        persona_name: 'Priya',
            valueStatement: 'Pressure-tests major decisions before they become expensive mistakes.',
        gender: 'female',
        ethnicity: 'South Asian',
        age_range: '29-39',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Priya&hair=long&hairColor=black&skinColor=brown',
        is_active: true,
      },
      {
        id: 'samuel',
        persona_name: 'Samuel',
        gender: 'male',
        ethnicity: 'African American',
        age_range: '34-44',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Samuel&hair=short&hairColor=black&skinColor=dark',
        is_active: true,
      },
    ],
  },
  {
    id: 'project_manager',
    display_name: 'Project Manager',
    department: 'Operations',
      authorityTier: 3,
            valueStatement: 'Keeps leadership priorities aligned and execution moving.',
      tasks: {
        coreResponsibilities: [
          'Perform primary tasks on a recurring basis',
          'Execute secondary tasks using defined inputs and tools',
          'Maintain consistency with brand, process, or system rules',
          'Identify errors, gaps, or inefficiencies and flag them',
          'Deliver outputs in the required format and cadence',
        ],
        escalationRules: [
          'Escalate when inputs are missing, conflicting, or unclear',
          'Escalate when results fall outside defined success criteria',
          'Escalate any request that exceeds assigned authority tier',
        ],
      },
    default_oversight: 'approval',
    status: 'available',
    description: 'Coordinates projects and teams.',
    handles: ['Task Tracking', 'Scheduling', 'Team Management'],
    boundaries: ['Cannot approve budgets'],
    personas: [
      {
        id: 'juan',
        persona_name: 'Juan',
        gender: 'male',
        ethnicity: 'Latino',
        age_range: '38-48',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Juan&hair=short&hairColor=brown&skinColor=light',
        is_active: true,
      },
      {
        id: 'grace',
        persona_name: 'Grace',
        gender: 'female',
        ethnicity: 'White',
        age_range: '35-45',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Grace&hair=long&hairColor=blonde&skinColor=light',
        is_active: true,
      },
    ],
  },
  {
    id: 'hr_assistant',
    display_name: 'HR Assistant',
    department: 'HR',
      authorityTier: 2,
      tasks: {
        coreResponsibilities: [
          'Perform primary tasks on a recurring basis',
          'Execute secondary tasks using defined inputs and tools',
          'Maintain consistency with brand, process, or system rules',
          'Identify errors, gaps, or inefficiencies and flag them',
          'Deliver outputs in the required format and cadence',
        ],
        escalationRules: [
          'Escalate when inputs are missing, conflicting, or unclear',
          'Escalate when results fall outside defined success criteria',
          'Escalate any request that exceeds assigned authority tier',
        ],
      },
    default_oversight: 'review',
    status: 'available',
    description: 'Supports HR operations and onboarding.',
    handles: ['Screening', 'Onboarding', 'Policy'],
    boundaries: ['Cannot make hiring decisions'],
    personas: [
      {
        id: 'sofia',
        persona_name: 'Sofia',
        gender: 'female',
        ethnicity: 'Hispanic',
        age_range: '26-36',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia&hair=long&hairColor=brown&skinColor=light',
        is_active: true,
      },
      {
        id: 'chen',
        persona_name: 'Chen',
        gender: 'male',
        ethnicity: 'Chinese',
        age_range: '31-41',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Chen&hair=short&hairColor=black&skinColor=yellow',
        is_active: true,
      },
    ],
  },

  // Tier 1 — Task Executor roles
  {
    id: 'copywriter',
    display_name: 'Copywriter',
    department: 'Content & Brand',
    authorityTier: 1,
    pricingBand: {
      label: 'Tier 1',
      price: 150,
      unit: 'month',
      description: 'Task Executor — Replace tasks. Entry point, volume driver, trust builder.'
    },
    tasks: {
      coreResponsibilities: [
        'Write short-form copy using provided briefs and examples',
        'Follow brand voice guidelines exactly',
        'Revise copy based on direct feedback',
        'Deliver copy in required format and length',
      ],
      escalationRules: [
        'Escalate all ambiguity or unclear instructions',
        'Escalate requests outside defined tasks',
      ],
        pricingBand: {
          label: 'Tier 2',
          price: 450,
          unit: 'month',
          description: 'Process Owner — Replace workflows. Premium, high-ROI, credibility anchor.'
        },
    },
    default_oversight: 'review',
    status: 'available',
    description: 'Writes short-form copy and revises per feedback.',
    handles: ['Copywriting', 'Editing'],
    boundaries: ['No independent judgment', 'No publishing authority'],
    personas: [
      { id: 'copywriter_m', persona_name: 'Alex', gender: 'male', is_active: true },
      { id: 'copywriter_f', persona_name: 'Jamie', gender: 'female', is_active: true },
    ],
  },
  {
    id: 'blog_writer',
    display_name: 'Blog Writer',
    department: 'Content & Brand',
    authorityTier: 1,
    pricingBand: {
      label: 'Tier 1',
      price: 150,
      unit: 'month',
      description: 'Task Executor — Replace tasks. Entry point, volume driver, trust builder.'
    },
    tasks: {
      coreResponsibilities: [
        'Draft blog posts from provided outlines',
        'Research supporting information from approved sources',
        'Format content for readability and SEO basics',
        'Submit drafts for review without publishing',
      ],
      escalationRules: [
        'Escalate all ambiguity or unclear instructions',
        'Escalate requests outside defined tasks',
      ],
    },
    default_oversight: 'review',
    status: 'available',
    description: 'Drafts blog posts and formats for SEO.',
    handles: ['Blog Writing', 'SEO Formatting'],
    boundaries: ['No publishing authority', 'No independent judgment'],
    personas: [
      { id: 'blogwriter_m', persona_name: 'Sam', gender: 'male', is_active: true },
      { id: 'blogwriter_f', persona_name: 'Taylor', gender: 'female', is_active: true },
    ],
  },
  {
    id: 'documentation_specialist',
    display_name: 'Documentation Specialist',
    department: 'Content & Brand',
    authorityTier: 1,
    pricingBand: {
      label: 'Tier 1',
      price: 150,
      unit: 'month',
      description: 'Task Executor — Replace tasks. Entry point, volume driver, trust builder.'
    },
    tasks: {
      coreResponsibilities: [
        'Convert existing processes into written documentation',
        'Update documents based on provided change notes',
        'Ensure clarity, formatting, and version accuracy',
        'Flag outdated or conflicting information',
      ],
      escalationRules: [
        'Escalate all ambiguity or unclear instructions',
        'Escalate requests outside defined tasks',
      ],
        pricingBand: {
          label: 'Tier 3',
          price: 950,
          unit: 'month',
          description: 'Domain Lead — Replace outcomes. Aggressive, justified, signals leadership replacement.'
        },
    },
    default_oversight: 'review',
    status: 'coming_soon',
    description: 'Documents processes and maintains accuracy.',
    handles: ['Documentation', 'Process Writing'],
    boundaries: ['No process changes', 'No independent judgment'],
    personas: [
      { id: 'docspec_m', persona_name: 'Jordan', gender: 'male', is_active: false },
      { id: 'docspec_f', persona_name: 'Morgan', gender: 'female', is_active: false },
    ],
  },
  {
    id: 'knowledge_base_curator',
    display_name: 'Knowledge Base Curator',
    department: 'Content & Brand',
    authorityTier: 1,
    pricingBand: {
      label: 'Tier 1',
      price: 150,
      unit: 'month',
      description: 'Task Executor — Replace tasks. Entry point, volume driver, trust builder.'
    },
    tasks: {
      coreResponsibilities: [
        'Organize articles into predefined categories',
        'Update answers based on new inputs',
        'Remove deprecated content when instructed',
        'Maintain consistency across entries',
      ],
      escalationRules: [
        'Escalate all ambiguity or unclear instructions',
        'Escalate requests outside defined tasks',
      ],
    },
    default_oversight: 'review',
    status: 'coming_soon',
    description: 'Curates and updates knowledge base content.',
    handles: ['Knowledge Base', 'Content Organization'],
    boundaries: ['No content creation', 'No independent judgment'],
    personas: [
      { id: 'kbcurator_m', persona_name: 'Chris', gender: 'male', is_active: false },
      { id: 'kbcurator_f', persona_name: 'Riley', gender: 'female', is_active: false },
    ],
  },
  {
    id: 'email_campaign_assistant',
    display_name: 'Email Campaign Assistant',
    department: 'Content & Brand',
    authorityTier: 1,
    pricingBand: {
      label: 'Tier 1',
      price: 150,
      unit: 'month',
      description: 'Task Executor — Replace tasks. Entry point, volume driver, trust builder.'
    },
    tasks: {
      coreResponsibilities: [
        'Draft emails from approved templates',
        'Insert variables and personalization fields',
        'Format emails for deliverability standards',
        'Submit drafts for approval before sending',
      ],
      escalationRules: [
        'Escalate all ambiguity or unclear instructions',
        'Escalate requests outside defined tasks',
      ],
    },
    default_oversight: 'review',
    status: 'coming_soon',
    description: 'Assists with email campaign drafts and formatting.',
    handles: ['Email Drafting', 'Personalization'],
    boundaries: ['No sending authority', 'No independent judgment'],
    personas: [
      { id: 'emailassist_m', persona_name: 'Drew', gender: 'male', is_active: false },
      { id: 'emailassist_f', persona_name: 'Casey', gender: 'female', is_active: false },
    ],
  },
  // ... (continue with data_intelligence, operations_coordination, sales_growth_success, engineering_product, legal_finance_compliance roles as described)
];

// Add more roles: Designer, Developer, Data Analyst, Legal Assistant, Incident Response Coordinator, etc.
// Each with unique authority tier, boundaries, oversight, and status.
