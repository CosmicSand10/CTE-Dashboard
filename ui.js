/*==================================================
    CTE CLASS CHAMPIONSHIP
    UI
    Part 1
==================================================*/


/*==================================================
    Helpers
==================================================*/

function currentClasses(){

    return dashboardData.currentDay === "gold"
        ? CONFIG.gold
        : CONFIG.red;

}


function currentClass(){

    const classes = [

        ...CONFIG.gold,

        ...CONFIG.red

    ];

    return classes.find(

        c => c.id === dashboardData.selectedClass

    );

}


function currentStage(points){

    let stage = CONFIG.stages[0];

    CONFIG.stages.forEach(s=>{

        if(points >= s.points){

            stage = s;

        }

    });

    return stage;

}


function nextReward(points){

    for(const reward of CONFIG.rewards){

        if(points < reward.points){

            return {

                name:reward.name,

                remaining:reward.points-points

            };

        }

    }

    return{

        name:"🏆 All Rewards Unlocked!",

        remaining:0

    };

}



/*==================================================
    Build Class Tabs
==================================================*/

function buildTabs(){

    const container = document.getElementById("classTabs");

    container.innerHTML="";

    currentClasses().forEach(c=>{

        const tab = document.createElement("button");

        tab.className="class-tab";

        tab.dataset.id=c.id;

        tab.textContent=c.short;

        if(c.id===dashboardData.selectedClass){

            tab.classList.add("active");

        }

        tab.onclick=()=>{

            setAutoMode(false);

            setSelectedClass(c.id);

            refreshDashboard();

        };

        container.appendChild(tab);

    });

}



/*==================================================
    Render Main Card
==================================================*/

function renderMainCard(){

    const c = currentClass();

    const score = getScore(c.id);

    document.getElementById("classTitle").textContent =

        `${c.period} • ${c.name}`;

    document.getElementById("score").textContent =

        score;

    const percent =

        Math.min(

            score / CONFIG.maxPoints * 100,

            100

        );

    document.getElementById("progressFill").style.width =

        percent + "%";

    document.getElementById("progressFill").style.background =

        c.color;

    const stage = currentStage(score);

    document.getElementById("constructionStage").textContent =

        stage.stage;

    const reward = nextReward(score);

    document.getElementById("nextReward").textContent =

        reward.name;

    document.getElementById("rewardRemaining").textContent =

        reward.remaining > 0

        ? `${reward.remaining} Points Remaining`

        : "Completed!";

}



/*==================================================
    Score Animation
==================================================*/

function animateScore(target){

    const scoreElement = document.getElementById("score");

    const current = Number(scoreElement.textContent);

    if(current===target){

        return;

    }

    const direction = target > current ? 1 : -1;

    let value=current;

    const timer = setInterval(()=>{

        value+=direction;

        scoreElement.textContent=value;

        if(value===target){

            clearInterval(timer);

        }

    },10);

}



/*==================================================
    Update Progress Bar
==================================================*/

function updateProgress(){

    const c = currentClass();

    const score = getScore(c.id);

    const percent =

        Math.min(

            score / CONFIG.maxPoints * 100,

            100

        );

    const bar = document.getElementById("progressFill");

    bar.style.width = percent + "%";

    bar.style.background = c.color;

}



/*==================================================
    End Part 1
==================================================*/
/*==================================================
    UI
    Part 2
==================================================*/


/*==================================================
    Leaderboard
==================================================*/

function renderLeaderboard(){

    const board = document.getElementById("leaderboard");

    board.innerHTML = "";

    const leaders = getLeaderboard();

    leaders.forEach((c,index)=>{

        const li = document.createElement("li");

        const medals=["🥇","🥈","🥉"];

        li.innerHTML=`
            <strong>${medals[index] || `${index+1}.`}</strong>
            ${c.short}
            <span style="float:right">${c.points}</span>
        `;

        board.appendChild(li);

    });

}



/*==================================================
    Reward List
==================================================*/

function renderRewardList(){

    const container = document.getElementById("rewardList");

    container.innerHTML="";

    const score = getScore(currentClass().id);

    CONFIG.rewards.forEach(reward=>{

        const item=document.createElement("div");

        if(score>=reward.points){

            item.innerHTML=`✅ ${reward.name}`;

        }else{

            item.innerHTML=`⬜ ${reward.name}`;

        }

        container.appendChild(item);

    });

}



/*==================================================
    Competition Panel
==================================================*/

function renderCompetition(){

    document.getElementById("totalPoints").textContent=

        totalPoints();

    const leader=getLeaderboard()[0];

    document.getElementById("currentLeader").textContent=

        leader.short;

}



/*==================================================
    Clock
==================================================*/

function updateClock(){

    const now=new Date();

    document.getElementById("clock").textContent=

        now.toLocaleTimeString([],{

            hour:"numeric",

            minute:"2-digit"

        });

}



/*==================================================
    Teacher Menu
==================================================*/

function setupTeacherMenu(){

    const menu=document.getElementById("teacherModal");

    document.getElementById("teacherMenu").onclick=()=>{

        menu.classList.remove("hidden");

    };

    document.getElementById("closeTeacher").onclick=()=>{

        menu.classList.add("hidden");

    };

}



/*==================================================
    Day Buttons
==================================================*/

function updateDayButtons(){

    document.getElementById("goldDay")
        .classList.toggle(
            "active",
            dashboardData.currentDay==="gold"
        );

    document.getElementById("redDay")
        .classList.toggle(
            "active",
            dashboardData.currentDay==="red"
        );

}



/*==================================================
    Schedule Buttons
==================================================*/

function updateScheduleButtons(){

    document.getElementById("regularSchedule")
        .classList.toggle(
            "active",
            dashboardData.currentSchedule==="regular"
        );

    document.getElementById("wednesdaySchedule")
        .classList.toggle(
            "active",
            dashboardData.currentSchedule==="wednesday"
        );

    document.getElementById("dwsdSchedule")
        .classList.toggle(
            "active",
            dashboardData.currentSchedule==="dwsd"
        );

}



/*==================================================
    Refresh Dashboard
==================================================*/

function refreshDashboard(){

    buildTabs();

    renderMainCard();

    renderLeaderboard();

    renderRewardList();

    renderCompetition();

    updateProgress();

    updateDayButtons();

    updateScheduleButtons();

}



/*==================================================
    Initialize UI
==================================================*/

function initializeUI(){

    setupTeacherMenu();

    updateClock();

    refreshDashboard();

    setInterval(updateClock,1000);

}



/*==================================================
    End UI
==================================================*/
