/*==================================================
    CTE CLASS CHAMPIONSHIP
    STORAGE
==================================================*/

const STORAGE_KEY = "cteDashboardV2";


const DEFAULT_DATA = {

    scores: {

        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0

    },

    currentDay:"gold",

    currentSchedule:"regular",

    selectedClass:0,

    autoMode:true,

    controlsLocked:false,

    hallOfChampions:[]

};


let dashboardData = {};



/*==================================================
    LOAD
==================================================*/

function loadData(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        dashboardData = JSON.parse(saved);

    }else{

        dashboardData = structuredClone(DEFAULT_DATA);

        saveData();

    }

}



/*==================================================
    SAVE
==================================================*/

function saveData(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(dashboardData)

    );

}



/*==================================================
    SCORE HELPERS
==================================================*/

function getScore(classId){

    return dashboardData.scores[classId] || 0;

}


function setScore(classId,value){

    dashboardData.scores[classId] = Math.max(

        0,

        Math.min(CONFIG.maxPoints,value)

    );

    saveData();

}


function addPoints(classId,amount){

    setScore(

        classId,

        getScore(classId)+amount

    );

}



/*==================================================
    SETTINGS
==================================================*/

function setCurrentDay(day){

    dashboardData.currentDay = day;

    saveData();

}


function setCurrentSchedule(schedule){

    dashboardData.currentSchedule = schedule;

    saveData();

}


function setSelectedClass(classId){

    dashboardData.selectedClass = classId;

    saveData();

}


function setAutoMode(enabled){

    dashboardData.autoMode = enabled;

    saveData();

}


function lockControls(lock){

    dashboardData.controlsLocked = lock;

    saveData();

}



/*==================================================
    MONTHLY RESET
==================================================*/

function monthlyReset(){

    Object.keys(

        dashboardData.scores

    ).forEach(id=>{

        dashboardData.scores[id]=0;

    });

    saveData();

}



/*==================================================
    HALL OF CHAMPIONS
==================================================*/

function saveChampion(month){

    const winner = getLeaderboard()[0];

    dashboardData.hallOfChampions.push({

        month,

        winner

    });

    saveData();

}



/*==================================================
    LEADERBOARD
==================================================*/

function getLeaderboard(){

    const classes = [

        ...CONFIG.gold,

        ...CONFIG.red

    ];

    return classes

    .map(c=>({

        ...c,

        points:getScore(c.id)

    }))

    .sort(

        (a,b)=>b.points-a.points

    );

}



/*==================================================
    TOTAL POINTS
==================================================*/

function totalPoints(){

    return Object.values(

        dashboardData.scores

    ).reduce(

        (a,b)=>a+b,

        0

    );

}
