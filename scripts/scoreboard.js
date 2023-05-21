// Grupo: 23 -->
//Número: 60858 Nome: Diogo Piçarra PL:26-->
//Número:  Nome: José Lopes PL:26-->
//Número:  Nome: Vladana Giebler PL:26-->

//DADOS
let JOGOCURRENTE="jogocurrente"

//BASE

function leader(nome, highscore, time){
    this.nome = nome;
    this.highscore = highscore;
    this.time=time;
}

const leaders = [
                // nome  highscore  time
    new leader ("Vladana", 9998, "00:01"),
    new leader ("Diogo", 9998,"00:01"),
    new leader ("José", 9998, "00:01"),
    new leader ("Professora Vânia Mendonça", 9999, "00,00")
    ];


window.addEventListener("load", principal);

function principal() {
    //novoscore();
    desenharow();
}


function desenharow(){
    let theExport = "";
    leaders.forEach((leader) => theExport += "<tr><td>" + leader.nome + "</td><td>" + leader.highscore + "</td><td>" + leader.time + "</td></tr>");
    document.getElementById("scoreboard").innerHTML = theExport;
}