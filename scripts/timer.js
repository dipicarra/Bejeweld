
function timer(){
    let sec = 0;
    let min = 0
    var timer = setInterval(function(){
        document.getElementById('timer').innerHTML='Time:' +min +':' +sec;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        sec++;
    // 1000 é o nº de milisegundos entre "ticks" ou seja a cada 1s sofre update
    }, 1000);
}

window.addEventListener("load", onload);

function onload(){
    timer()
}