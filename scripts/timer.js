
function timer(){
    // sec é o tempo do timer
    var sec = 30;
    var timer = setInterval(function(){
        document.getElementById('timer').innerHTML='00:'+sec;
        sec--;
        // fim do timer
        if (sec < 0) {
            clearInterval(timer);
            alert("Time's up!");
        }
    // 1000 é o nº de milisegundos entre "ticks" ou seja a cada 1s sofre update
    }, 1000);
}

window.addEventListener("load", onload);

function onload(){
    timer()
}