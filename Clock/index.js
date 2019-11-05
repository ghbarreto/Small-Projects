const hoursSelect = document.getElementById('hoursChosen');
const minutesChosen = document.getElementById('minutesChosen');
const select = document.createElement('select');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const renderHours = document.getElementById('hoursChosen');
const renderMinutes = document.getElementById('minutesChosen');
const audio = new Audio('alarmSound.mp3');
const alarms = document.getElementById('alarms');
const disappear = document.getElementById('disappear');
let clockHours;
let optionHours = [];
let clockMins;
let optionMins = [];


getHours();
getMinutes();
getSeconds();
renderHoursFunction();
renderMinutesFunction();
setInterval(alarmClock, 3000);
sendHours();

function getHours(){
    const hoursScope = new Date();
    clockHours = hoursScope.getHours();

    hours.innerHTML = clockHours + ":";   

    setInterval(function(){
        const hoursInterval = new Date();
        let hoursUpdate = hoursInterval.getHours();

        hours.innerHTML = hoursUpdate + ":";
    }, 10);
}

function getMinutes(){
    const minutesCheck = new Date();
    let res2 = minutesCheck.getMinutes();

    clockMins = res2;

    setTimeout(function(res){ 
        const minutesScope = new Date();
        result = minutesScope.getMinutes();
        
        if(result <= 9){
            minutes.innerHTML = "0" + result + ":";
        }else{
            minutes.innerHTML = result + ":";
        }  
        getMinutes(result);
        
    }, 10); 
}

function getSeconds(){
    setInterval(function(){
        const secondsScope = new Date();
        const result = secondsScope.getSeconds();

        if(result <= 9){
            seconds.innerHTML = "0"+result;
        }else{
            seconds.innerHTML = result;
        }
        
    }, 10);
}

function renderHoursFunction(){

    for(let i = 0; i <= 24; i++){
        let newOption = document.createElement('option');
        
        if(i>0 && i<=9){
            newOption.innerHTML = "0"+i;
        }
        else{
            newOption.innerHTML = i;
        }

        newOption.id = 'op' + i;
        renderHours.appendChild(newOption);
    }
}

function renderMinutesFunction(){
    for(let i = 0; i <= 59; i++){
        let newOption = document.createElement('option');
        
        if(i>0 && i<=9){
            newOption.innerHTML = "0"+i;
        }else{
            newOption.innerHTML = i;
        }
        
        newOption.id = 'min' + i;
        renderMinutes.appendChild(newOption);
    }
}

function sendHours(){
    optionHours = hoursSelect.options[hoursSelect.selectedIndex].value;
    optionMins = minutesChosen.options[minutesChosen.selectedIndex].value;
    alarmClock();
    setTimeout(addTime, 50);
}

function alarmClock(){

    if(optionHours > 0 && optionMins > 0){
        if (optionHours == clockHours && optionMins == clockMins){
            setInterval(trigger, 1000);
        }
    }
    
}

function trigger(){
    let audioPromise = new Promise(function(resolve, reject){
        setTimeout(function (){
            audio.play();
        }, 3000);
    });

    audioPromise.then(function(myPromise){
        myPromise.play();
    });
}

function addTime(){
    let newAlarm = document.createElement('div');
    
    if(optionHours > 0 && optionMins > 0){
        newAlarm.innerHTML = 'You set your alarm for <br>' + optionHours + " : " + optionMins ;
        newAlarm.id = 'alarm';
        alarms.appendChild(newAlarm);
        disappear.style.display = "block";
    }  
}

