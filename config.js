/*==================================================
    CTE CLASS CHAMPIONSHIP
    CONFIGURATION
==================================================*/

const CONFIG = {

    // ==========================================
    // General Settings
    // ==========================================

    maxPoints: 300,

    schoolName: "Chico High School",

    title: "CTE CLASS CHAMPIONSHIP",

    autoSwitch: true,

    animationSpeed: 300,



    // ==========================================
    // Gold Day Classes
    // ==========================================

    gold: [

        {
            id: 0,
            short: "ENG 2",
            name: "Engineering 2",
            period: "Gold 1",
            color: "#00D8FF"
        },

        {
            id: 1,
            short: "ENG 3-4",
            name: "Engineering 3-4",
            period: "Gold 2",
            color: "#00E676"
        },

        {
            id: 2,
            short: "ARCH 1",
            name: "Architecture 1",
            period: "Gold 4",
            color: "#FFD54F"
        }

    ],



    // ==========================================
    // Red Day Classes
    // ==========================================

    red: [

        {
            id: 3,
            short: "ENG 1A",
            name: "Engineering 1",
            period: "Red 1",
            color: "#FF7043"
        },

        {
            id: 4,
            short: "ENG 1B",
            name: "Engineering 1",
            period: "Red 2",
            color: "#EF5350"
        },

        {
            id: 5,
            short: "ARCH 2-4",
            name: "Architecture 2-4",
            period: "Red 3",
            color: "#AB47BC"
        }

    ],



    // ==========================================
    // Rewards
    // ==========================================

    rewards: [

        {
            points:75,
            name:"🎧 Headphones While Working"
        },

        {
            points:150,
            name:"🎵 Class DJ"
        },

        {
            points:225,
            name:"🎁 Mystery Reward"
        },

        {
            points:300,
            name:"🎉 FREE FRIDAY"
        }

    ],



    // ==========================================
    // Construction Stages
    // ==========================================

    stages:[

        {
            points:0,
            stage:"📐 Planning"
        },

        {
            points:25,
            stage:"🚧 Site Prep"
        },

        {
            points:75,
            stage:"🏗 Foundation"
        },

        {
            points:100,
            stage:"🧱 Framing"
        },

        {
            points:150,
            stage:"🔩 Structural Steel"
        },

        {
            points:200,
            stage:"⚡ Electrical"
        },

        {
            points:250,
            stage:"🪟 Finishing"
        },

        {
            points:300,
            stage:"🏆 Project Complete"
        }

    ]

};
