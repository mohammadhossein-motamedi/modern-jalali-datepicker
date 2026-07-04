import DatePicker from "./dist/modern-jalali-datepicker";


// Basic

new DatePicker({
    element:"#basic"});


// Range

new DatePicker({
    element:"#range",

    range:true

});


// Multiple

new DatePicker({
    element:"#multiple",

    multiple:5

});


// Time

new DatePicker({
    element :"#time",

    time:true,
    hourFormat:12,
    showSeconds:true

});


// Theme

const themePicker=new DatePicker({
    element : "#themePicker",
    theme:"light"

});

document.querySelector("#theme").onchange=e=>{

    themePicker.setTheme(e.target.value);

};


// Events

new DatePicker({
    element:"#events",

    events:{

        "1405-04-10":{

            type:"meeting",
            title:"Meeting"

        },

        "1405-04-12":{

            type:"birthday",
            title:"Birthday"

        },

        "1405-04-20":{

            type:"important",
            title:"Important"

        }

    }

});


// Min / Max

new DatePicker({
    element :"#limit",

    minDate:"1405/04/05",
    maxDate:"1405/04/25",
    time:true,
    minTime:"09:00",
    maxTime:"18:00"

});


// Methods

const picker=new DatePicker({
    element:"#methods",

    time:true

});

const out=document.querySelector("#output");

document.querySelector("#close").onclick=()=>picker.close();

document.querySelector("#clear").onclick=()=>picker.clear();

document.querySelector("#destroy").onclick=()=>picker.destroy();

document.querySelector("#get").onclick=()=>{

    out.textContent=JSON.stringify(

        picker.getDate(),

        null,

        2

    );

};

document.querySelector("#set").onclick=()=>{

    picker.setDate("1405/04/15");

};


document.querySelector("#themePicker")
.addEventListener("pdp:theme",e=>{

    console.log("Theme:",e.detail);

});
