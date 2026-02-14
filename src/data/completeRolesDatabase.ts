// Complete Roles Database

const rolesDatabase = {
    tier1: [
        { name: "AI Assistant", price: 150, authorityLevel: 1, responsibilities: ["Provide basic AI support", "Answer customer queries"], boundaries: ["Cannot make decisions independently"], dualPersonas: [{male: "John", female: "Jane"}] },
        // Additional roles...
    ],
    tier2: [
        { name: "Data Scientist", price: 500, authorityLevel: 2, responsibilities: ["Analyze data", "Develop machine learning models"], boundaries: ["Must consult with senior staff before major decisions"], dualPersonas: [{male: "Mike", female: "Maria"}] },
        // Additional roles...
    ],
    tier3: [
        { name: "AI Product Manager", price: 800, authorityLevel: 3, responsibilities: ["Oversee AI projects", "Coordinate between teams"], boundaries: ["Cannot approve budgets"], dualPersonas: [{male: "Richard", female: "Rachel"}] },
        // Additional roles...
    ],
    tier4: [
        { name: "Heather", price: 1299, authorityLevel: 4, responsibilities: ["Lead diversity initiatives", "Represent AI division"], boundaries: ["Governed by community standards"], dualPersonas: [{male: "Gary", female: "Kierra"}] },
        { name: "Muscular Male", price: 1000, authorityLevel: 4, responsibilities: ["Promote diversity in AI teams", "Participate in outreach"], boundaries: [], dualPersonas: [{male: "Brian", female: "Jordan"}] },
        { name: "Kierra", price: 1200, authorityLevel: 4, responsibilities: ["Mentor young AI employees", "Support cultural initiatives"], boundaries: [], dualPersonas: [{male: "Nathan", female: "Kahlynn"}] }
        // Additional roles...
    ]
};

export default rolesDatabase;