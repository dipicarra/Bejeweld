
function timer(){
    // sec é o tempo do timer
    var sec = 0;
    var timer = setInterval(function(){
        document.getElementById('timer').innerHTML='Time: 00:'+sec;
        sec++;
    // 1000 é o nº de milisegundos entre "ticks" ou seja a cada 1s sofre update
    }, 1000);
}

window.addEventListener("load", onload);

function onload(){
    timer()
}