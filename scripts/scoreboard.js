// Grupo: 23 
// Número: 60858 Nome: Diogo Piçarra PL:26
// Número: 51758 Nome: José Lopes PL:26
// Número: 61279 Nome: Vladana Giebler PL:26

//DADOS
const JOGOCURRENTE="jogocurrente";
const esteJogo = JSON.parse(localStorage.getItem(JOGOCURRENTE));
const PLAYERLIST = "playerList"
let PLAYERDETAILS = [];
const STORAGESINGLENORMAL="storagesinglenormal";
const STORAGEMULTINORMAL="storagemultinormal";
const STORAGESINGLEINFINITO="storagesingleinfinito";
const STORAGEMULTIINFINITO="storagemultiinfinito";

//TITULO
const TITUTO="mododejogo"

//BOTOES

const BOTAO_SINGLE_NORMAL="btnsinglenormal"
const BOTAO_MULTI_NORMAL="btnmultinormal"
const BOTAO_SINGLE_INFINITO="btnsingleinfinito"
const BOTAO_MULTI_INFINITO="btnmultiinfinito"

//objetos

function leader(nome, highscore, time){
    this.nome = nome;
    this.highscore = highscore;
    this.time=time;
}

function Player (user, password, genero, idade, email, logedin, stats){

    this.user=user;
    this.password=password;
    this.genero=genero;
    this.idade=idade;
    this.email=email;
    this.logedin=logedin;
    this.stats=stats;
}

// scoreboards base

let SCORESINGLENORMAL=[
                       new leader ("Vladana", 9998, "00:01"),
                       new leader ("Diogo", 9998,"00:01"),
                       new leader ("José", 9998, "00:01"),
                       new leader ("Professora Vânia Mendonça", 9999, "00:00")];

let SCOREMULTINORMAL=[
                       new leader ("Vladana", 9998, "00:01"),
                       new leader ("Diogo", 9998,"00:01"),
                       new leader ("José", 9998, "00:01"),
                       new leader ("Professora Vânia Mendonça", 9999, "00:00")];

let SCORESINGLEINFINITO=[
                       new leader ("Vladana", 9998, "00:01"),
                       new leader ("Diogo", 9998,"00:01"),
                       new leader ("José", 9998, "00:01"),
                       new leader ("Professora Vânia Mendonça", 9999, "00:00")];
                       
let SCOREMULTIINFINITO=[
                       new leader ("Vladana", 9998, "00:01"),
                       new leader ("Diogo", 9998,"00:01"),
                       new leader ("José", 9998, "00:01"),
                       new leader ("Professora Vânia Mendonça", 9999, "00:00")];


window.addEventListener("load", onload);

function onload() {
    PLAYERDETAILS = JSON.parse(localStorage.getItem(PLAYERLIST)) || [];
    atualizarScores();
    functionalidades();
    botoes();
    novoScore();
    desenharTabela();
}

function novoScore(){
    let novoleader = null;
    let nomeleader="";
    let primeiro=true;
    PLAYERDETAILS.forEach((jogador) => {
        if (jogador.logedin == "yes"){
            if (primeiro == true){
                nomeleader+=(jogador.user).toString();
                primeiro=false;
            }
            else{
                nomeleader+=" & " + (jogador.user).toString();
            }
        }
    })
    if (esteJogo[3]==true){
        novoleader = new leader(nomeleader,esteJogo[1],esteJogo[2]);
        if (esteJogo[0] == "singlenormal"){
            SCORESINGLENORMAL.push(novoleader);
            SCORESINGLENORMAL=organizarScore(SCORESINGLENORMAL).slice(0,10);
            localStorage.setItem(STORAGESINGLENORMAL,JSON.stringify(SCORESINGLENORMAL));
        }
        else if (esteJogo[0] == "multinormal"){
            SCOREMULTINORMAL.push(novoleader);
            SCOREMULTINORMAL=organizarScore(SCOREMULTINORMAL).slice(0,10);
            localStorage.setItem(STORAGEMULTINORMAL,JSON.stringify(SCOREMULTINORMAL));
        }
        else if (esteJogo[0] == "singleinfinito"){
            SCORESINGLEINFINITO.push(novoleader);
            SCORESINGLEINFINITO=organizarScore(SCORESINGLEINFINITO).slice(0,10);
            localStorage.setItem(STORAGESINGLEINFINITO,JSON.stringify(SCORESINGLEINFINITO));
        }
        else if (esteJogo[0] == "multiInfinito"){
            SCOREMULTIINFINITO.push(novoleader);
            SCOREMULTIINFINITO=organizarScore(SCOREMULTIINFINITO).slice(0,10);
            localStorage.setItem(STORAGEMULTIINFINITO,JSON.stringify(SCOREMULTIINFINITO));
        };
    }
}

// função desenha row tem uma variável principal 'theExport' que recebe do ciclo for uma linha por cada "leader"
function desenharTabela(){
    let theExport = "";
    let listaraw=null;
    if (esteJogo[0] == "singlenormal"){
        listaraw=SCORESINGLENORMAL;
    }
    else if (esteJogo[0] == "multinormal"){
        listaraw=SCOREMULTINORMAL;
    }
    else if (esteJogo[0] == "singleinfinito"){
        listaraw=SCORESINGLEINFINITO;
    }
    else if (esteJogo[0] == "multiInfinito"){
        listaraw=SCOREMULTIINFINITO;
    }
    listaraw.forEach((leader) => theExport += "<tr><td>" + leader.nome + "</td><td>" + leader.highscore + "</td><td>" + leader.time + "</td></tr>");
    document.getElementById("scoreboard").innerHTML = theExport;
}

function functionalidades(){
    if (esteJogo[0] == "singlenormal"){
        document.getElementById(TITUTO).innerHTML="Singleplayer";
        document.getElementById(BOTAO_SINGLE_NORMAL).disabled=true;
        document.getElementById(BOTAO_MULTI_NORMAL).disabled=false;
        document.getElementById(BOTAO_SINGLE_INFINITO).disabled=false;
        document.getElementById(BOTAO_MULTI_INFINITO).disabled=false;
    }
    else if (esteJogo[0] == "multinormal"){
        document.getElementById(TITUTO).innerHTML="Multiplayer";
        document.getElementById(BOTAO_SINGLE_NORMAL).disabled=false;
        document.getElementById(BOTAO_MULTI_NORMAL).disabled=true;
        document.getElementById(BOTAO_SINGLE_INFINITO).disabled=false;
        document.getElementById(BOTAO_MULTI_INFINITO).disabled=false;
    }
    else if (esteJogo[0] == "singleinfinito"){
        document.getElementById(TITUTO).innerHTML="Singleplayer Infinito";
        document.getElementById(BOTAO_SINGLE_NORMAL).disabled=false;
        document.getElementById(BOTAO_MULTI_NORMAL).disabled=false;
        document.getElementById(BOTAO_SINGLE_INFINITO).disabled=true;
        document.getElementById(BOTAO_MULTI_INFINITO).disabled=false;
    }
    else if (esteJogo[0] == "multiInfinito"){
        document.getElementById(TITUTO).innerHTML="Multiplayer Infinito";
        document.getElementById(BOTAO_SINGLE_NORMAL).disabled=false;
        document.getElementById(BOTAO_MULTI_NORMAL).disabled=false;
        document.getElementById(BOTAO_SINGLE_INFINITO).disabled=false;
        document.getElementById(BOTAO_MULTI_INFINITO).disabled=true;
    };
};
function botoes(){
    document.getElementById(BOTAO_SINGLE_NORMAL).addEventListener("click", singlenormal);
    document.getElementById(BOTAO_MULTI_NORMAL).addEventListener("click", multinormal);
    document.getElementById(BOTAO_SINGLE_INFINITO).addEventListener("click", singleinfinito);
    document.getElementById(BOTAO_MULTI_INFINITO).addEventListener("click", multiinfinito);
}

function singlenormal(){
    esteJogo[0]="singlenormal";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    functionalidades();
    desenharTabela();
}

function multinormal(){
    esteJogo[0]="multinormal";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    functionalidades();
    desenharTabela();
}
function singleinfinito(){
    esteJogo[0]="singleinfinito";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    functionalidades();
    desenharTabela();
}
function multiinfinito(){
    esteJogo[0]="multiInfinito";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    functionalidades();
    desenharTabela();
};

function organizarScore(lista){
    console.log("sorted")
    lista.sort(function(a, b) {
        if (b.highscore !== a.highscore) {
          return b.highscore - a.highscore;
        }
        
        const timeA = a.time.split(':');
        const timeB = b.time.split(':');
        
        const minutesA = parseInt(timeA[0], 10);
        const minutesB = parseInt(timeB[0], 10);
        
        if (minutesA !== minutesB) {
          return minutesA - minutesB;
        }
        
        const secondsA = parseInt(timeA[1], 10);
        const secondsB = parseInt(timeB[1], 10);
        
        if (secondsA !== secondsB) {
          return secondsA - secondsB;
        }
        
        return a.nome.localeCompare(b.nome);
      });
    return lista
}

function atualizarScores(){
    SCORESINGLENORMAL= JSON.parse(localStorage.getItem(STORAGESINGLENORMAL)) || SCORESINGLENORMAL;
    SCOREMULTINORMAL= JSON.parse(localStorage.getItem(STORAGEMULTINORMAL)) || SCOREMULTINORMAL;
    SCORESINGLEINFINITO= JSON.parse(localStorage.getItem(STORAGESINGLEINFINITO)) || SCORESINGLEINFINITO;
    SCOREMULTIINFINITO= JSON.parse(localStorage.getItem(STORAGEMULTIINFINITO)) || SCOREMULTIINFINITO;
    SCORESINGLENORMAL=organizarScore(SCORESINGLENORMAL);
    SCOREMULTINORMAL=organizarScore(SCOREMULTINORMAL);
    SCORESINGLEINFINITO=organizarScore(SCORESINGLEINFINITO);
    SCOREMULTIINFINITO=organizarScore(SCOREMULTIINFINITO);
}