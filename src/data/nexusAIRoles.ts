// File: src/data/nexusAIRoles.ts

// Nexus AI Roles

type Role = {
    tier: number;
    name: string;
    pricing: number;
    authority: string;
    responsibilities: string;
    boundaries: string;
    persona: string;
};

const roles: Role[] = [
    // Tier 1 Roles
    { tier: 1, name: 'Role 1', pricing: 150, authority: 'Limited', responsibilities: 'Basic tasks', boundaries: 'No decision making', persona: 'Persona A (Male)' },
    { tier: 1, name: 'Role 2', pricing: 200, authority: 'Limited', responsibilities: 'Basic tasks', boundaries: 'No decision making', persona: 'Persona B (Female)' },
    // ... (Add more Tier 1 roles up to 15)

    // Tier 2 Roles
    { tier: 2, name: 'Role 16', pricing: 300, authority: 'Moderate', responsibilities: 'Intermediate tasks', boundaries: 'Some decision making', persona: 'Persona C (Male)' },
    { tier: 2, name: 'Role 17', pricing: 350, authority: 'Moderate', responsibilities: 'Intermediate tasks', boundaries: 'Some decision making', persona: 'Persona D (Female)' },
    // ... (Add more Tier 2 roles up to 15)

    // Tier 3 Roles
    { tier: 3, name: 'Role 31', pricing: 500, authority: 'High', responsibilities: 'Advanced tasks', boundaries: 'Decision making', persona: 'Gary (Male)' },
    { tier: 3, name: 'Role 32', pricing: 550, authority: 'High', responsibilities: 'Advanced tasks', boundaries: 'Decision making', persona: 'Kierra (Female)' },
    // ... (Add more Tier 3 roles up to 15)

    // Tier 4 Roles
    { tier: 4, name: 'Role 46', pricing: 800, authority: 'Executive', responsibilities: 'Strategic decisions', boundaries: 'Limited to cross-functional', persona: 'Heather (Female)' },
    { tier: 4, name: 'Role 47', pricing: 899, authority: 'Executive', responsibilities: 'Strategic decisions', boundaries: 'Limited to cross-functional', persona: 'Kahlynn (Female)' },
    { tier: 4, name: 'Role 48', pricing: 999, authority: 'Executive', responsibilities: 'Strategic decisions', boundaries: 'Limited to cross-functional', persona: 'Jordan (Female)' },
    { tier: 4, name: 'Role 49', pricing: 1099, authority: 'Executive', responsibilities: 'Strategic decisions', boundaries: 'Limited to cross-functional', persona: 'Brian (Male)' },
    { tier: 4, name: 'Role 50', pricing: 1299, authority: 'Executive', responsibilities: 'Strategic decisions', boundaries: 'Limited to cross-functional', persona: 'Nathan (Male)' },
    { tier: 4, name: 'Role 51', pricing: 1200, authority: 'Executive', responsibilities: 'Strategic decisions', boundaries: 'Limited to cross-functional', persona: 'Random Male (e.g. Alex)' },
];

export default roles;
