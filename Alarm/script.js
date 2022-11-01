// Get audio from file
var sound = new Audio("./Alarm Sound 1.wav");
sound.loop = true;

// Get DOM elements
var hour = document.querySelector(".hours");
var minute = document.querySelector(".minutes");
var second = document.querySelector(".seconds");
var ampm = document.querySelector(".ampm");
var alarmHour = document.getElementById("alarm-hour");
var alarmMin = document.getElementById("alarm-min");
var alarmSec = document.getElementById("alarm-sec");
var alarmAP = document.getElementById('alarm-ampm');		

function changeClock(){
    // Declare some local variables
    let hr = new Date().getHours();
    let mn = new Date().getMinutes();
    let sc = new Date().getSeconds();
    let ap = "AM";

    // Change AM to PM after 12 afternoon
    if(hr > 12){
        hr -= 12;
        ap = "PM";
    }else{
        ap = "AM";
    }

    // Adding 0 before single numbers
    hr = hr < 10 ? "0" + hr : hr;
    mn = mn < 10 ? "0" + mn : mn;
    sc = sc < 10 ? "0" + sc : sc;

    // Displaying the times
    hour.textContent = hr;
    minute.textContent = mn;
    second.textContent = sc;
    ampm.textContent= ap;

    // Calling the function in every 900 milliseconds
    setTimeout(changeClock, 900);
}
// Calling the function
changeClock();

// Adding time options to select tags
function selectTime(){
    for(let i = 1; i <= 12; i++){
        alarmHour.options[alarmHour.options.length] = new Option( i < 10 ? "0" + i : i, i);
    }
    for(let i = 0; i <= 59; i++){
        alarmMin.options[alarmMin.options.length] = new Option( i < 10 ? "0" + i : i, i);
    }
    for(let i = 0; i <= 59; i++){
        alarmSec.options[alarmSec.options.length] = new Option( i < 10 ? "0" + i : i, i);
    }
}
selectTime();

function addZero(time){
    // Add zero if the number is under 10
    return (time < 10) ? "0" + time : time;
}

function setAlarm(){
    // Get the selected times
    let selectedHour = alarmHour.options[alarmHour.selectedIndex].value;
    let selectedMin = alarmMin.options[alarmMin.selectedIndex].value;
    let selectedSec = alarmSec.options[alarmSec.selectedIndex].value;
    let selectedAP = alarmAP.options[alarmAP.selectedIndex].value;

    // Make disable to select tags
    alarmHour.disabled = true;
    alarmMin.disabled = true;
    alarmSec.disabled = true;
    alarmAP.disabled = true;

    setInterval(function(){
        // If above time and selected time are same then play the sound
        if(addZero(selectedHour) == hour.innerText){
            if(addZero(selectedMin) == minute.innerText){
                if(addZero(selectedSec) == second.innerText){
                    if(addZero(selectedAP) == ampm.innerText){
                        sound.play();
                    }
                }
            }
        }
    }, 1000);
}

// Cancel the alarm
function clearAlarm() {
    // Make enable to select tags
    alarmHour.disabled = false;
    alarmMin.disabled = false;
    alarmSec.disabled = false;
    alarmAP.disabled = false;
    sound.pause();
}