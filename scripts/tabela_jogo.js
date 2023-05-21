// Grupo: 23 -->
//Número: 60858 Nome: Diogo Piçarra PL:26-->
//Número:  Nome: José Lopes PL:26-->
//Número:  Nome: Vladana Giebler PL:26-->

// DEFINICOES DO JOGO BASE
let ALTURA_TABELA=8;
let LARGURA_TABELA=8;
let JOIAS=20;
let TEMPOMULTI=20;

//PERCENTAGENS DE PECAS
let PER_ESPECIAL=15;
let PER_NORMAL=100-PER_ESPECIAL;

//TABULEIRO
var jogo=[];
var peca_clicada=null;

//DADOS
var pontuacao = 0;
var joias_destruidas = 0;
const PONTUACAO = "pontuacao";
const JOIAS_DISPLAY = "joias";
const JOIAS_TOTAIS = "joiastotais";
const TITULO_JOGO = "titlejogo";
const SUBTITULO_JOGO = "subtitulojogo";
const TABELA_HTML = "tabelajogo";
const IMPOSSIVEL = "impossivel";
const TIMERMULTITXT = "timermultitxt";
const TIMERMULTI = "timermulti";
const PLAYERLIST = "playerList";
let PLAYERDETAILS = [];

//AUDIO
const blop3 = new Audio("media/Blop 3.mp3");
const torololo = new Audio("media/Torololo.mp3");

//MODO DE JOGO
let JOGOCURRENTE="jogocurrente"
let esteJogo = JSON.parse(localStorage.getItem(JOGOCURRENTE));

//BOTOES
const BOTAO_DICA= "btndica";
const BOTAO_SHUFFLE= "btnshuffle";
const BOTAO_END="btnend";

//PRECOS BUTOES

const PRECO_SHUFFLE=2;
const PRECO_DICA=1;

window.addEventListener("load", onload);

//PECAS DISPONIVEIS
const cadaPeca = [
    new peca ("azul","media/por/blueGem.png"),
    new peca ("verde","media/por/greenGem.png"),
    new peca ("laranja","media/por/orangeGem.png"),
    new peca ("roxo","media/por/purpleGem.png"),
    new peca ("vermelho","media/por/redGem.png"),
    new peca ("branco","media/por/whiteGem.png"),
    new peca ("amarelo","media/por/yellowGem.png")
];

const especiais = [
    new peca ("bomba","media/por/bomb.png"),
    new peca ("tempo","media/por/time.png")
]

function peca (id,imagem){
    this.id=id;
    this.imagem=imagem;
};


function onload() {
    PLAYERDETAILS = JSON.parse(localStorage.getItem(PLAYERLIST)) || [];
    definicoes();
    generarTitulos();
    botoes();
    jogadasPossiveis();
}

function generarTitulos(){
    if (esteJogo[0] == "singlenormal"){
        document.getElementById(TITULO_JOGO).innerHTML="Singleplayer";
        document.getElementById(SUBTITULO_JOGO).innerHTML="Singleplayer";
        document.getElementById(JOIAS_TOTAIS).innerHTML=JOIAS;
    }
    else if (esteJogo[0] == "multinormal"){
        document.getElementById(TITULO_JOGO).innerHTML="Multiplayer";
        document.getElementById(SUBTITULO_JOGO).innerHTML="Multiplayer";
        document.getElementById(JOIAS_TOTAIS).innerHTML=JOIAS;
        document.getElementById(TIMERMULTITXT).classList.remove("desaparecer");
        countdown(TEMPOMULTI);
    }
    else if (esteJogo[0] == "singleinfinito"){
        document.getElementById(TITULO_JOGO).innerHTML="Singleplayer INFINITY";
        document.getElementById(SUBTITULO_JOGO).innerHTML="Singleplayer INFINITY";
        document.getElementById(JOIAS_TOTAIS).innerHTML="∞";
    }
    else if (esteJogo[0] == "multiInfinito"){
        document.getElementById(TITULO_JOGO).innerHTML="Multiplayer INFINITY";
        document.getElementById(SUBTITULO_JOGO).innerHTML="Multiplayer INFINITY";
        document.getElementById(JOIAS_TOTAIS).innerHTML="∞";
        document.getElementById(TIMERMULTITXT).classList.remove("desaparecer");
        countdown(TEMPOMULTI);
    };
};

function definicoes(){
    if (esteJogo[0]=="singlenormal" || esteJogo[0]=="multinormal"){
        let dificuldades = window.prompt("Escolhe dificuldade:\n-Fácil (8x8, 20 joias)\n-Intermédio (9x9, 25 joias)\n-Difícil (10x10, 30 joias)");
        if (dificuldades == null){
            dificuldades = "facil"
        }
        dificuldades=dificuldades.toString().toLowerCase().normalize();
        if (dificuldades=="intermedio"){
            ALTURA_TABELA=9;
            LARGURA_TABELA=9;
            JOIAS=25;
        }
        else if (dificuldades=="dificil"){
            ALTURA_TABELA=10;
            LARGURA_TABELA=10;
            JOIAS=30;
        }
    }
    else if (esteJogo[0]=="singleinfinito" || esteJogo[0]=="multiInfinito"){
        JOIAS=Infinity;
        let dificuldades = window.prompt("Escolhe tamanho:\n-Tall (8x8)\n-Grande (9x9)\n-Venti (10x10)");
        if (dificuldades == null){
            dificuldades = "tall"
        }
        dificuldades=dificuldades.toString().toLowerCase().normalize();
        if (dificuldades=="grande"){
            ALTURA_TABELA=9;
            LARGURA_TABELA=9;
        }
        else if (dificuldades=="venti"){
            ALTURA_TABELA=10;
            LARGURA_TABELA=10;
        }
    }
    inicializarTabela();
};

function inicializarTabela(){
    jogo=eliminarPecasAMais(desenharTabela());
    arrayParaHtml(jogo);
}

function arrayParaHtml(game){
    let tabelaParaHtml = "";
    game.forEach((linha, numeroLinha) => {
        let cadaLinha="";
        linha.forEach((tpeca, numeroTpeca) => {
            if (tpeca==null){
                cadaLinha += "<td id= L" + numeroLinha + numeroTpeca + 
                "> <img style='width:50px; height:50px' id='" + numeroLinha + numeroTpeca + "' src='media/por/emptySlot.png'></td>";
            }
            else{
                cadaLinha += "<td id= L" + numeroLinha + numeroTpeca + 
                "> <img style='width:50px; height:50px' id='" + numeroLinha + numeroTpeca + "' src=" + tpeca["imagem"] +
                "></td>";
            }
        });
        tabelaParaHtml += "<tr id= r" + numeroLinha + ">" + cadaLinha + "</tr>";
    });
    document.getElementById(TABELA_HTML).innerHTML = tabelaParaHtml;

    const pecasJogo = document.querySelectorAll("#tabelajogo td");

    pecasJogo.forEach((pecaJogo) => {
        pecaJogo.addEventListener("click", () => {
            if (document.getElementById(TABELA_HTML).classList.contains("clickable")) {
                blop3.play();
                pecaJogo.classList.add("clicked");
                let imageId = pecaJogo.querySelector("img").id;
                moverPeca(imageId);
            }
        });
    });    
}

function moverPeca(imageId) {
    if (peca_clicada==null){
        peca_clicada = imageId;
    }
    else if (verSePecaAdjacente(peca_clicada,imageId)==true){
        let tempjogo=jogo[parseInt(imageId[0])][parseInt(imageId[1])];
        jogo[parseInt(imageId[0])][parseInt(imageId[1])]=jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])];
        jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])]=tempjogo;

        let pecaAntiga=document.getElementById(peca_clicada);
        let pecaNova=document.getElementById(imageId);
        pecaNova.parentNode.classList.remove("clicked");
        pecaAntiga.parentNode.classList.remove("clicked");

        if (verSeHaTresEmLinha(jogo).length>0){    
            let temp=pecaNova.src;
            pecaNova.src=pecaAntiga.src;
            pecaAntiga.src=temp;
            
            peca_clicada=null;
            capturarpecas();
        }
        else{
            let tempjogo = jogo[parseInt(imageId[0])][parseInt(imageId[1])];
            jogo[parseInt(imageId[0])][parseInt(imageId[1])] = jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])];
            jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])] = tempjogo;

            peca_clicada=null;
        }
    }
    else{
        let pecaAntiga=document.getElementById(peca_clicada);
        let pecaNova=document.getElementById(imageId);
        pecaNova.parentNode.classList.remove("clicked");
        pecaAntiga.parentNode.classList.remove("clicked");
        peca_clicada=null;
    }
}

function verSePecaAdjacente(pecaAntiga,pecaNova){
    let resultado=false
    if (pecaAntiga[0] == pecaNova[0] &&
        (Math.abs(parseInt(pecaAntiga[1])-parseInt(pecaNova[1])))==1){
            resultado=true;
        }
    else if (pecaAntiga[1] == pecaNova[1] &&
        (Math.abs(parseInt(pecaAntiga[0])-parseInt(pecaNova[0])))==1){
            resultado=true;
        }
    return resultado;
}


function desenharTabela(){
    let tabela=[];
    for (let i = 0; i < ALTURA_TABELA; i++){
        linha=desenharRow();
        tabela.push(linha);
    }
    return tabela;
}


function desenharRow(){
    let novaLinha=[];
    for (let i = 0; i < LARGURA_TABELA; i++){
        novaLinha.push(generarPeca());
    }
    return novaLinha;
}

function generarPeca(){
    let tipopeca=Math.floor(Math.random()*100)
    let pecagerada=null
    if (tipopeca < PER_ESPECIAL){
        pecagerada = especiais[Math.floor(Math.random()*especiais.length)];
    }
    else {
        pecagerada = cadaPeca[Math.floor(Math.random()*cadaPeca.length)];
    }
    return pecagerada;
}

function verSeHaTresEmLinha(tabela){
    // isto funciona para mais de 3 mas n me aptece mudar o nome da funcao

    let listaDe3EmLinha=[];

    //HORIZONTAL
    for (let linha=0; linha < tabela.length; linha++){
        for (let tpeca=0; tpeca<tabela[linha].length; tpeca++){
            let contador=1;
            let conjunto=[[linha,tpeca]];
            let tipoespecial=null;
            let tiponormal=null;
            for (let tpecaSeguinte = tpeca+1; tpecaSeguinte < tabela[linha].length; tpecaSeguinte++) {
                if (especiais.some(obj => obj.id == tabela[linha][tpeca].id)){
                    tipoespecial=tabela[linha][tpeca].id
                    if (tabela[linha][tpecaSeguinte].id==tipoespecial){
                        conjunto.push([linha,tpecaSeguinte]);
                        contador+=1;
                    }
                    else if (tabela[linha][tpecaSeguinte].id==tiponormal){
                        conjunto.push([linha,tpecaSeguinte]);
                        contador+=1;
                    }

                    else if (tiponormal==null && cadaPeca.some(obj => obj.id == tabela[linha][tpecaSeguinte].id)){
                        tiponormal=tabela[linha][tpecaSeguinte].id
                        conjunto.push([linha,tpecaSeguinte]);
                        contador+=1;
                    }
                    else{
                        break
                    }
                }
                else if (cadaPeca.some(obj => obj.id == tabela[linha][tpeca].id)){
                    tiponormal=tabela[linha][tpeca].id
                    if(tabela[linha][tpecaSeguinte].id==tiponormal){
                        conjunto.push([linha,tpecaSeguinte]);
                        contador+=1;
                    }
                    else if (tabela[linha][tpecaSeguinte].id==tipoespecial){
                        conjunto.push([linha,tpecaSeguinte]);
                        contador+=1;
                    }

                    else if (tipoespecial==null && especiais.some(obj => obj.id == tabela[linha][tpecaSeguinte].id)){
                        tipoespecial=tabela[linha][tpecaSeguinte].id
                        conjunto.push([linha,tpecaSeguinte]);
                        contador+=1;
                    }
                    else{
                        break
                    }
                }  
            }
            if (contador >= 3){
                listaDe3EmLinha.push(conjunto);
                tpeca += contador;
            }
        }
    }

    //VERTICAL
    for (let coluna=0; coluna < tabela[0].length; coluna++){
        for (let tpeca=0; tpeca<tabela.length; tpeca++){
            let contador=1;
            let conjunto=[[tpeca,coluna]];
            let tipoespecial=null;
            let tiponormal=null;
            for (let tpecaSeguinte = tpeca+1; tpecaSeguinte < tabela.length; tpecaSeguinte++) {
                if (especiais.some(obj => obj.id == tabela[tpeca][coluna].id)){
                    tipoespecial=tabela[tpeca][coluna].id
                    if (tabela[tpecaSeguinte][coluna].id==tipoespecial){
                        conjunto.push([tpecaSeguinte,coluna]);
                        contador+=1;
                    }
                    else if (tabela[tpecaSeguinte][coluna].id==tiponormal){
                        conjunto.push([tpecaSeguinte,coluna]);
                        contador+=1;
                    }
                    else if (tiponormal==null && cadaPeca.some(obj => obj.id == tabela[tpecaSeguinte][coluna].id)){
                        tiponormal=tabela[tpecaSeguinte][coluna].id
                        conjunto.push([tpecaSeguinte,coluna]);
                        contador+=1;
                    }
                    else{
                        break
                    }
                }
                else if (cadaPeca.some(obj => obj.id == tabela[tpeca][coluna].id)){
                    tiponormal=tabela[tpeca][coluna].id
                    if(tabela[tpecaSeguinte][coluna].id==tiponormal){
                        conjunto.push([tpecaSeguinte,coluna]);
                        contador+=1;
                    }
                    else if (tabela[tpecaSeguinte][coluna].id==tipoespecial){
                        conjunto.push([tpecaSeguinte,coluna]);
                        contador+=1;
                    }
                    else if (tipoespecial==null && especiais.some(obj => obj.id == tabela[tpecaSeguinte][coluna].id)){
                        tipoespecial=tabela[tpecaSeguinte][coluna].id
                        conjunto.push([tpecaSeguinte,coluna]);
                        contador+=1;
                    }
                    else{
                        break
                    }
                }  
            }
            
            if (contador >= 3){
                listaDe3EmLinha.push(conjunto);
                tpeca += contador;
            }
        }
    }
    return listaDe3EmLinha;
}

function eliminarPecasAMais(tabela){

    /**Recebe uma tabela, vê se existe algum 3 ou mais de seguida e 
    elimina todos menos o primeiro para aleatorios (podem ser os mesmos mas
    corre outra vez)*/

    let listaAMais = verSeHaTresEmLinha(tabela);
    while (listaAMais.length > 0){
        listaAMais.forEach((aMais) => {
            aMais.forEach((pecaMa)=>{
                tabela[pecaMa[0]][pecaMa[1]]=generarPeca();
            })
        })
        listaAMais = verSeHaTresEmLinha(tabela);
        }
    return tabela
}

function capturarpecas(){
    let bombas=[];
    let tempos=[];
    let normais=[];
    let emLinha=verSeHaTresEmLinha(jogo);

    emLinha.forEach((conjunto) => {
        pontuacao+=(conjunto.length)-2;
        conjunto.forEach((pecalinha) => {
            if (jogo[pecalinha[0]][pecalinha[1]].id=="bomba"){
                bombas.push([pecalinha[0],pecalinha[1]])
            }
            else if(jogo[pecalinha[0]][pecalinha[1]].id=="tempo"){
                tempos.push([pecalinha[0],pecalinha[1]])
            }
            else{
                normais.push([pecalinha[0],pecalinha[1]])
            }
        })
    })
    document.getElementById(TABELA_HTML).classList.remove("clickable");
    
    actualizarSideboard()
    //Matryoshka functions to make timeouts
    setTimeout(()=>emLinhaFicamNull(bombas,tempos,normais),250);
}

function emLinhaFicamNull(listabombas,listatempo,listanormais){
     //transformar todas as linas em nulls
     let startRow = 0;
     let endRow = 0;
     let startCol = 0;
     let endCol = 0;

    listabombas.forEach((bomba)=>{
        startRow = Math.max(0, bomba[0] - 1);
        endRow = Math.min(jogo.length - 1, bomba[0] + 1);
        startCol = Math.max(0, bomba[1] - 1);
        endCol = Math.min(jogo[0].length - 1, bomba[1] + 1);

        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
              jogo[i][j]=null;
            }
        }
        jogo[bomba[0]][bomba[1]]=null;
    })
    listatempo.forEach((ptempo)=>{
        pontuacao+=2
        jogo[ptempo[0]][ptempo[1]]=null;
    })
    listanormais.forEach((normails)=>{
        jogo[normails[0]][normails[1]]=null;
    })
    
    torololo.play();
    arrayParaHtml(jogo);
    setTimeout(descerParaBaixoNull, 250);
}

function descerParaBaixoNull(){
    //mover pecas que tem nulls embaixo delas para baixo
    for (coluna=0; coluna<jogo[0].length; coluna++){
        let nullcounter=0;
        for (linhaContraria = jogo.length-1; linhaContraria>=0; linhaContraria--){ //Vou correr a tabela debaixo para cima para puchar as pecas para baixo mais facilmente
            if (jogo[linhaContraria][coluna]==null){
                joias_destruidas+=1
                nullcounter+=1
            }
            else if (linhaContraria < jogo.length-1){
                if (jogo[linhaContraria+1][coluna]==null && jogo[linhaContraria][coluna]!==null){
                    jogo[linhaContraria+nullcounter][coluna]=jogo[linhaContraria][coluna];
                    jogo[linhaContraria][coluna]=null;
                }
            }
        }
    }
    nullFicaNovaPeca();
}


function nullFicaNovaPeca(){
    //todos os nulls passam a ser pecas novas
    jogo.forEach((linha,linhaIndex)=>{
        linha.forEach((tpeca,tpecaIndex)=>{
            if (jogo[linhaIndex][tpecaIndex]==null){
                jogo[linhaIndex][tpecaIndex]=generarPeca();
            }
        })
    })
    emLinha = verSeHaTresEmLinha(jogo);
    actualizarSideboard()
    arrayParaHtml(jogo);
    
    if (emLinha.length>0){
        setTimeout(capturarpecas, 729);
    }
    else {
        document.getElementById(TABELA_HTML).classList.add("clickable");
        actualizarSideboard();
        checkIfImpossivel();
        checkIfEndgame();
    };
};

function botoes(){
    document.getElementById(BOTAO_DICA).addEventListener("click",dica);
    document.getElementById(BOTAO_SHUFFLE).addEventListener("click",shuffle);
    document.getElementById(BOTAO_END).addEventListener("click",endgame);
};

function adjacenteTabela(pecaindex){
    let adjacentes=[];
    jogo.forEach((linha,linhaIndex) => {
        linha.forEach((tpeca,tpecaIndex)=> {
            let pecanova=[linhaIndex,tpecaIndex]
            if (verSePecaAdjacente(pecaindex,pecanova)==true){
                adjacentes.push(pecanova)
            }
        })
    })
    return adjacentes
};

function jogadasPossiveis(){
    let possiveis=[];
    jogo.forEach((linha,linhaIndex) => {
        linha.forEach((tpeca,tpecaIndex)=> {
            let estaPeca=[linhaIndex,tpecaIndex];
            let juntos = adjacenteTabela(estaPeca);
            juntos.forEach((elemento)=>{
                let temppeca=jogo[estaPeca[0]][estaPeca[1]];
                jogo[estaPeca[0]][estaPeca[1]]=jogo[elemento[0]][elemento[1]];
                jogo[elemento[0]][elemento[1]]=temppeca;
                if (verSeHaTresEmLinha(jogo).length>0){
                    possiveis.push(estaPeca)
                }
                temppeca=jogo[estaPeca[0]][estaPeca[1]];
                jogo[estaPeca[0]][estaPeca[1]]=jogo[elemento[0]][elemento[1]];
                jogo[elemento[0]][elemento[1]]=temppeca;
            })
        })
    })
    return possiveis
};

function dica(){
    pontuacao-=1;
    jogadas=jogadasPossiveis();
    actualizarSideboard();
    let pecaDica=jogadas[Math.floor(Math.random()*jogadas.length)];
    document.getElementById("L"+pecaDica.join("")).classList.add("dica");
    setInterval(function(){document.getElementById("L"+pecaDica.join("")).classList.remove("dica");},3000)
}

function shuffle(){
    pontuacao-=2;
    actualizarSideboard();
    jogo=eliminarPecasAMais(desenharTabela());
    arrayParaHtml(jogo);
}

function endgame(){
    window.alert("Jogo Terminou");
    let tempo=document.getElementById("timer").innerHTML;
    let novoEsteJogo=[esteJogo[0],pontuacao,tempo.toString(),true];
    localStorage.setItem(JOGOCURRENTE,JSON.stringify(novoEsteJogo));
    window.location.href="stats.html";
}

function actualizarSideboard(){

    document.getElementById(PONTUACAO).innerHTML=pontuacao;
    document.getElementById(JOIAS_DISPLAY).innerHTML=joias_destruidas;

    if (document.getElementById(TABELA_HTML).classList.contains("clickable")){
        if (pontuacao<=0){
            document.getElementById(BOTAO_DICA).disabled=true;
            document.getElementById(BOTAO_SHUFFLE).disabled=true;
        }
        if (pontuacao>=PRECO_DICA){
            document.getElementById(BOTAO_DICA).disabled=false;
        }
        if (pontuacao>=PRECO_SHUFFLE){
            document.getElementById(BOTAO_SHUFFLE).disabled=false;
        }
    }
    else{
        document.getElementById(BOTAO_DICA).disabled=true;
        document.getElementById(BOTAO_SHUFFLE).disabled=true;
    }
}

function checkIfEndgame(){
    if (joias_destruidas>=JOIAS){
        endgame();
    }
    else if(checkIfImpossivel() && pontuacao>=PRECO_SHUFFLE){
        endgame();
    }
}

function checkIfImpossivel(){
    if (jogadasPossiveis().lenght==0){
        document.getElementById("IMPOSSIVEL").classList.remove("desaparecer");
        return true
    }
    else{
        return false
    }
}

function countdown(tempototal){
    let tempoagora=tempototal;
    let delay=0; //para os countdowns comecarem em tempos diferentes, o primeiro é 0
    let counter=0; //serve para recomecar a contar quando todos os jogadores tiverem jogado sem que tenha que fazer um while true pk isso ia dar problemas
    let listaLogedin=listaDeJogadores();

    //TEMPORIZADOR
    const novoCountdown = () =>{
        tempoagora=tempototal;
        document.getElementById(TIMERMULTI).innerHTML=tempoagora;
        window.alert("Vez do " + listaLogedin[counter%listaLogedin.length].user)
        const countdownJogador = setInterval(() => {
            if (tempoagora <= 0) {
                counter+=1;
                clearInterval(countdownJogador);
            }
            tempoagora--;
            document.getElementById(TIMERMULTI).innerHTML=tempoagora;
        }, 1000);
    }

    //FAZER COM QUE O TEMPORIZADOR CORRA PARA SEMPRE
    const comecarCountdowns = () =>{
        novoCountdown();
        delay=(tempototal +1) * 1000;
        setTimeout(comecarCountdowns,delay);
    };

    //COMECAR TEMPORIZADOR
    comecarCountdowns();
}

function listaDeJogadores(){
    listaJogadores=[];

    PLAYERDETAILS.forEach(regPlayer => {
        if (regPlayer.logedin == "yes"){
            listaJogadores.push(regPlayer)
        }
    })
    return listaJogadores;
}