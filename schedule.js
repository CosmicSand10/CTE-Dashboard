/*==================================================
    CTE CLASS CHAMPIONSHIP
    BELL SCHEDULES
==================================================*/

const SCHEDULES = {

    regular: {

        gold: [

            {
                start: "08:30",
                end: "09:58",
                classId: 0
            },

            {
                start: "10:13",
                end: "11:41",
                classId: 1
            },

            {
                start: "11:41",
                end: "12:27",
                type: "Lunch"
            },

            {
                start: "12:27",
                end: "01:55",
                classId: 2
            },

            {
                start: "02:02",
                end: "03:30",
                type: "Prep"
            }

        ],

        red: [

            {
                start: "08:30",
                end: "09:58",
                classId: 3
            },

            {
                start: "10:13",
                end: "11:41",
                classId: 4
            },

            {
                start: "11:41",
                end: "12:27",
                type: "Lunch"
            },

            {
                start: "12:27",
                end: "01:55",
                classId: 5
            },

            {
                start: "02:02",
                end: "03:30",
                type: "Prep"
            }

        ]

    },



    wednesday: {

        gold: [

            {
                start:"09:00",
                end:"10:21",
                classId:0
            },

            {
                start:"10:33",
                end:"11:54",
                classId:1
            },

            {
                start:"11:54",
                end:"12:41",
                type:"Lunch"
            },

            {
                start:"12:41",
                end:"02:02",
                classId:2
            },

            {
                start:"02:09",
                end:"03:30",
                type:"Prep"
            }

        ],

        red:[

            {
                start:"09:00",
                end:"10:21",
                classId:3
            },

            {
                start:"10:33",
                end:"11:54",
                classId:4
            },

            {
                start:"11:54",
                end:"12:41",
                type:"Lunch"
            },

            {
                start:"12:41",
                end:"02:02",
                classId:5
            },

            {
                start:"02:09",
                end:"03:30",
                type:"Prep"
            }

        ]

    },



    dwsd: {

        gold: [

            {
                start:"08:30",
                end:"09:31",
                classId:0
            },

            {
                start:"09:37",
                end:"10:38",
                classId:1
            },

            {
                start:"10:49",
                end:"11:50",
                classId:2
            },

            {
                start:"11:56",
                end:"03:30",
                type:"Prep"
            }

        ],

        red:[

            {
                start:"08:30",
                end:"09:31",
                classId:3
            },

            {
                start:"09:37",
                end:"10:38",
                classId:4
            },

            {
                start:"10:49",
                end:"11:50",
                classId:5
            },

            {
                start:"11:56",
                end:"03:30",
                type:"Prep"
            }

        ]

    }

};


/*==================================================
    Helper Functions
==================================================*/

function timeToMinutes(time){

    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;

}

function currentMinutes(){

    const now = new Date();

    return now.getHours() * 60 + now.getMinutes();

}


/*==================================================
    Returns current schedule block
==================================================*/

function getCurrentBlock(dayType, scheduleType){

    const schedule = SCHEDULES[scheduleType][dayType];

    const now = currentMinutes();

    for(const block of schedule){

        const start = timeToMinutes(block.start);

        const end = timeToMinutes(block.end);

        if(now >= start && now < end){

            return block;

        }

    }

    return {

        type:"After School"

    };

}
