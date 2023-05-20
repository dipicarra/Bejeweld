
function timer(){
    let sec = 0;
    let min = 0;
    let mil = 0;
    var timer = setInterval(function(){
        let formattedMin = String(min).padStart(2, '0');
        let formattedSec = String(sec).padStart(2, '0');
        let formattedMil = String(mil).padStart(3, '0');
        document.getElementById('timer').innerHTML=+ formattedMin + ':' + formattedSec ; 
        if (mil == 1000) {
        sec++;
        mil = 0;
        }
        if (sec == 60) {
        min++;
        sec = 0;
        }
        mil += 10;
    }, 10);
}

window.addEventListener("load", onload);

function onload(){
    timer()
}