// Grupo: 23 
// Número: 60858 Nome: Diogo Piçarra PL:26
// Número: 51758 Nome: José Lopes PL:26
// Número: 61279 Nome: Vladana Giebler PL:26

function timer(){
    // variável dos segundos
    let sec = 0;

    // variavel dos minutos
    let min = 0;

    // variavel dos milisegundos
    let mil = 0;

    // a var timer na verdade é um cronometro e não um temporizador
    var timer = setInterval(function(){

        // formatação da string para ter o formato mm:ss em vez do default m:s
        let formattedMin = String(min).padStart(2, '0');
        let formattedSec = String(sec).padStart(2, '0');

        // apesar de só se apresentar minutos e segundos na página 
        // o cronometro também é afetado pelos milisegundos o que o torna mais eficiente
        document.getElementById('timer').innerHTML=+ formattedMin + ':' + formattedSec ;
        
        // if statements responsáveis pela atualização do código
        if (mil == 1000) {
        sec++;
        mil = 0;
        }
        if (sec == 60) {
        min++;
        sec = 0;
        }
        mil += 10;

    // rate de atualização
    }, 10);
}

// função responsável por carregar o timer
window.addEventListener("load", onload);

function onload(){
    timer()
}