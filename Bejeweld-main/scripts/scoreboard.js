// Grupo: 23 -->
//Número: 60858 Nome: Diogo Piçarra PL:26-->
//Número:  Nome: José Lopes PL:26-->
//Número:  Nome: Vladana Giebler PL:26-->

function leader(nome, highscore){
    this.nome = nome;
    this.highscore = highscore;
}

const leaders = [
            // nome      highscore
    new leader ("fjisda", 9999),
    new leader ("fjisda1", 9999),
    new leader ("fjisda2", 9999),
    new leader ("fjisda3", 9999),
    new leader ("fjisda4", 9999),
    new leader ("fjisda5", 9999),
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