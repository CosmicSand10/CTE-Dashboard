/*==================================================
    CTE CLASS CHAMPIONSHIP
    MAIN SCRIPT
==================================================*/


/*==================================================
    Startup
==================================================*/

loadData();

initializeUI();



/*==================================================
    Point Buttons
==================================================*/

document.querySelectorAll(".pointButton").forEach(button=>{

    button.onclick=()=>{

        if(dashboardData.controlsLocked){

            return;

        }

        const amount=

            Number(button.dataset.value);

        const classId=

            dashboardData.selectedClass;

        addPoints(

            classId,

            amount

        );

        refreshDashboard();

    };

});



/*==================================================
    Undo
==================================================*/

let lastChange=0;

document.querySelectorAll(".pointButton").forEach(button=>{

    button.addEventListener("click",()=>{

        lastChange=

            Number(button.dataset.value);

    });

});

document.getElementById("undoButton").onclick=()=>{

    if(lastChange===0){

        return;

    }

    addPoints(

        dashboardData.selectedClass,

        -lastChange

    );

    lastChange=0;

    refreshDashboard();

};



/*==================================================
    Gold / Red
==================================================*/

document.getElementById("goldDay").onclick=()=>{

    setCurrentDay("gold");

    setSelectedClass(0);

    refreshDashboard();

};

document.getElementById("redDay").onclick=()=>{

    setCurrentDay("red");

    setSelectedClass(3);

    refreshDashboard();

};



/*==================================================
    Schedule Buttons
==================================================*/

document.getElementById("regularSchedule").onclick=()=>{

    setCurrentSchedule("regular");

    refreshDashboard();

};

document.getElementById("wednesdaySchedule").onclick=()=>{

    setCurrentSchedule("wednesday");

    refreshDashboard();

};

document.getElementById("dwsdSchedule").onclick=()=>{

    setCurrentSchedule("dwsd");

    refreshDashboard();

};



/*==================================================
    Teacher Menu
==================================================*/

document.getElementById("monthlyReset").onclick=()=>{

    const confirmReset=

        prompt(

            "Type RESET to clear every score."

        );

    if(confirmReset==="RESET"){

        monthlyReset();

        refreshDashboard();

    }

};



document.getElementById("lockControls").onclick=()=>{

    lockControls(

        !dashboardData.controlsLocked

    );

};



/*==================================================
    Auto Mode
==================================================*/

function autoSwitch(){

    if(!dashboardData.autoMode){

        return;

    }

    const block=

        getCurrentBlock(

            dashboardData.currentDay,

            dashboardData.currentSchedule

        );

    if(block.classId!==undefined){

        if(

            dashboardData.selectedClass!==

            block.classId

        ){

            setSelectedClass(

                block.classId

            );

            refreshDashboard();

        }

    }

}

setInterval(

    autoSwitch,

    30000

);



/*==================================================
    Initial Refresh
==================================================*/

refreshDashboard();
