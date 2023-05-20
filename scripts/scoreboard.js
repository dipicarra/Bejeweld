// Grupo: 23 -->
//Número: 60858 Nome: Diogo Piçarra PL:26-->
//Número:  Nome: José Lopes PL:26-->
//Número:  Nome: Vladana Giebler PL:26-->

function leader(nome, highscore){
    this.nome = nome;
    this.highscore = highscore;
}

const leaders = [
            // nome      highscore  time
    new leader ("Vladana", 9999, "00:01"),
    new leader ("Diogo", 9999,"00:01"),
    new leader ("José", 9999, "00:01"),
    ];




window.addEventListener("load", principal);

function principal() {
    desenharow()
}


function desenharow(){
    let theExport = ""
    //leaders.sort((aleader, bleader) => aleader.highscore - bleader.highscore);
    leaders.forEach((leader) => theExport += "<tr><td>" + leader.nome + "</td><td>" + leader.highscore + "</td></tr>");
    document.getElementById("scoreboard").innerHTML = theExport;
}