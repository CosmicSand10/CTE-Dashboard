// ======================================================
// CTE Classroom Dashboard - Version 1
// ======================================================

const SETTINGS = {
    maxPoints: 300,
    periods: ["GOLD 1 ENG 2","GOLD 2 ENG 3-4","GOLD 4 ARCH 1","RED 1 ENG 1","RED 2 ENG 1","RED 3 ARCH 2-4"],
    colors: ["#00C2FF","#00E676","#FF9800","#E91E63","#9C27B0","#FFD600"],
    rewards: [
        {points:75,name:"Headphones While Working"},
        {points:150,name:"Class DJ "},
        {points:225,name:"Mystery Reward"},
        {points:300,name:"FREE FRIDAY"}
    ],
    stages: [
        {points:0,name:"Planning"},
        {points:25,name:"🚧 Site Prep"},
        {points:75,name:"🏗 Foundation"},
        {points:100,name:"🧱 Framing"},
        {points:150,name:"🔩 Structural Steel"},
        {points:200,name:"⚡ Electrical"},
        {points:250,name:"🪟 Finishing"},
        {points:300,name:"🏆 Project Complete"}
    ]
};

let classes = [];
const undoStack = {};

function save(){
    localStorage.setItem("cteDashboardData", JSON.stringify(classes));
}

function load(){
    const data = localStorage.getItem("cteDashboardData");
    if(data){
        classes = JSON.parse(data);
    }else{
        classes = SETTINGS.periods.map((p,i)=>({
            name:p,
            points:0,
            color:SETTINGS.colors[i % SETTINGS.colors.length]
        }));
        save();
    }
}

function stage(points){
    let current = SETTINGS.stages[0].name;
    SETTINGS.stages.forEach(s=>{
        if(points>=s.points) current=s.name;
    });
    return current;
}

function nextReward(points){
    for(const r of SETTINGS.rewards){
        if(points<r.points){
            return {
                name:r.name,
                remaining:r.points-points
            };
        }
    }
    return {
        name:"🏆 All Rewards Unlocked!",
        remaining:0
    };
}

function updateCard(index){

    const c=classes[index];
    const card=document.querySelector(`[data-index="${index}"]`);

    card.querySelector(".score").textContent=`${c.points} Points`;

    const percent=Math.min(c.points/SETTINGS.maxPoints*100,100);

    card.querySelector(".progress-fill").style.width=percent+"%";
    card.querySelector(".progress-fill").style.background=c.color;
    card.style.borderColor=c.color;

    card.querySelector(".period-name").style.color=c.color;

    card.querySelector(".project-stage").textContent=stage(c.points);

    const reward=nextReward(c.points);

    card.querySelector(".reward-name").textContent=reward.name;
    card.querySelector(".points-left").textContent=
        reward.remaining>0 ?
        `${reward.remaining} pts remaining`
        :
        "Completed!";
}

function updateLeaderboard(){

    const board=document.getElementById("leaderboard");

    board.innerHTML="";

    [...classes]
    .sort((a,b)=>b.points-a.points)
    .forEach((c,i)=>{

        const li=document.createElement("li");

        const medals=["🥇","🥈","🥉"];

        li.textContent=`${medals[i]||`${i+1}.`} ${c.name} — ${c.points} pts`;

        board.appendChild(li);

    });

    const leader=[...classes].sort((a,b)=>b.points-a.points)[0];
    const total=classes.reduce((t,c)=>t+c.points,0);

    const ln=document.getElementById("leader-name");
    if(ln) ln.textContent=leader.name;

    const tp=document.getElementById("total-points");
    if(tp) tp.textContent=total;
}

function updateAll(){

    classes.forEach((_,i)=>updateCard(i));

    updateLeaderboard();

    save();

}

function changePoints(index,amount){

    undoStack[index]=amount;

    classes[index].points=Math.max(
        0,
        Math.min(
            SETTINGS.maxPoints,
            classes[index].points+amount
        )
    );

    updateAll();

}

function buildCards(){

    const container=document.getElementById("classes");

    const template=document.getElementById("class-card-template");

    classes.forEach((c,index)=>{

        const card=template.content.cloneNode(true);

        const root=card.querySelector(".class-card");

        root.dataset.index=index;

        root.querySelector(".period-name").textContent=`🔧 ${c.name}`;

        root.querySelectorAll("button[data-change]").forEach(btn=>{

            btn.addEventListener("click",()=>{

                changePoints(
                    index,
                    Number(btn.dataset.change)
                );

            });

        });

        root.querySelector(".undo").addEventListener("click",()=>{

            if(undoStack[index]){

                changePoints(index,-undoStack[index]);

                undoStack[index]=0;

            }

        });

        container.appendChild(card);

    });

}

function clock(){

    const el=document.getElementById("clock");

    if(!el) return;

    setInterval(()=>{

        el.textContent=new Date().toLocaleTimeString([],{
            hour:"numeric",
            minute:"2-digit"
        });

    },1000);

}

load();
buildCards();
updateAll();
clock();
