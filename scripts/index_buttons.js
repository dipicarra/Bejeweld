// Grupo: 23 
// Número: 60858 Nome: Diogo Piçarra PL:26
// Número: 51758 Nome: José Lopes PL:26
// Número: 61279 Nome: Vladana Giebler PL:26

//BOTOES

const BOTAO_LOGIN = "btnlogin";
const BOTAO_REGISTER = "btnregister";
const BOTAO_NOVO_JOGO = "btnnovogame";
const BOTAO_SCOREBOARD = "btnscoreboard";
const BOTAO_RULES = "btnrules";
const BOTAO_SINGLEPLAYER = "btnsingleplayer";
const BOTAO_MULTIPLAYER = "btnmultiplayer";
const BOTAO_VOLTAR = "btnvoltar";
const BOTAO_NORMAL_SINGLE = "btnnormalsingle";
const BOTAO_INFINITO_SINGLE = "btninfinitosingle";
const BOTAO_NORMAL_MULTI = "btnnormalmulti";
const BOTAO_INFINITO_MULTI = "btninfinitomulti";
const BOTAO_VOLTAR2 = "btnvoltar2";

let esteJogo = JSON.parse(localStorage.getItem("jogocurrente"));


window.addEventListener("load", onload);

function onload() {
    eventlistenerButoes();
}

function eventlistenerButoes(){
    document.getElementById(BOTAO_LOGIN).addEventListener("click", function() {window.location.href='login.html'});
    document.getElementById(BOTAO_REGISTER).addEventListener("click", function() {window.location.href='register.html'});
    document.getElementById(BOTAO_NOVO_JOGO).addEventListener("click", novojogo);
    document.getElementById(BOTAO_SCOREBOARD).addEventListener("click", function() {window.location.href='stats.html'});
    document.getElementById(BOTAO_RULES).addEventListener("click", function() {window.location.href='rules.html'});
    document.getElementById(BOTAO_SINGLEPLAYER).addEventListener("click", singleOpcoes);
    document.getElementById(BOTAO_MULTIPLAYER).addEventListener("click", multiOpcoes);
    document.getElementById(BOTAO_VOLTAR).addEventListener("click", botaoVoltar);
    document.getElementById(BOTAO_NORMAL_SINGLE).addEventListener("click", botaoSingleNormal);
    document.getElementById(BOTAO_INFINITO_SINGLE).addEventListener("click", botaoSingleInfinito);
    document.getElementById(BOTAO_NORMAL_MULTI).addEventListener("click", botaoMultiNormal);
    document.getElementById(BOTAO_INFINITO_MULTI).addEventListener("click", botaoMultiInfinito);
    document.getElementById(BOTAO_VOLTAR2).addEventListener("click", botaoVoltar2);
}

function novojogo(){
    document.getElementById(BOTAO_NOVO_JOGO).classList.add("desaparecer");
    document.getElementById(BOTAO_SCOREBOARD).classList.add("desaparecer");
    document.getElementById(BOTAO_RULES).classList.add("desaparecer");
    document.getElementById(BOTAO_SINGLEPLAYER).classList.remove("desaparecer");
    document.getElementById(BOTAO_MULTIPLAYER).classList.remove("desaparecer");
    document.getElementById(BOTAO_VOLTAR).classList.remove("desaparecer");

};

function singleOpcoes(){
    document.getElementById(BOTAO_SINGLEPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_MULTIPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_VOLTAR).classList.add("desaparecer");
    document.getElementById(BOTAO_NORMAL_SINGLE).classList.remove("desaparecer");
    document.getElementById(BOTAO_INFINITO_SINGLE).classList.remove("desaparecer");
    document.getElementById(BOTAO_VOLTAR2).classList.remove("desaparecer");
};

function multiOpcoes(){
    document.getElementById(BOTAO_SINGLEPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_MULTIPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_VOLTAR).classList.add("desaparecer");
    document.getElementById(BOTAO_NORMAL_MULTI).classList.remove("desaparecer");
    document.getElementById(BOTAO_INFINITO_MULTI).classList.remove("desaparecer");
    document.getElementById(BOTAO_VOLTAR2).classList.remove("desaparecer");
};


function botaoVoltar(){
    document.getElementById(BOTAO_NOVO_JOGO).classList.remove("desaparecer");
    document.getElementById(BOTAO_SCOREBOARD).classList.remove("desaparecer");
    document.getElementById(BOTAO_RULES).classList.remove("desaparecer");
    document.getElementById(BOTAO_SINGLEPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_MULTIPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_VOLTAR).classList.add("desaparecer");
};

function botaoVoltar2(){
    document.getElementById(BOTAO_NORMAL_SINGLE).classList.remove("desaparecer");
    document.getElementById(BOTAO_INFINITO_SINGLE).classList.remove("desaparecer");
    document.getElementById(BOTAO_VOLTAR2).classList.remove("desaparecer");
    document.getElementById(BOTAO_NORMAL_MULTI).classList.remove("desaparecer");
    document.getElementById(BOTAO_INFINITO_MULTI).classList.remove("desaparecer");
    document.getElementById(BOTAO_VOLTAR2).classList.remove("desaparecer");
    document.getElementById(BOTAO_NORMAL_SINGLE).classList.add("desaparecer");
    document.getElementById(BOTAO_INFINITO_SINGLE).classList.add("desaparecer");
    document.getElementById(BOTAO_VOLTAR2).classList.add("desaparecer");
    document.getElementById(BOTAO_NORMAL_MULTI).classList.add("desaparecer");
    document.getElementById(BOTAO_INFINITO_MULTI).classList.add("desaparecer");
    document.getElementById(BOTAO_VOLTAR2).classList.add("desaparecer");
    document.getElementById(BOTAO_SINGLEPLAYER).classList.remove("desaparecer");
    document.getElementById(BOTAO_MULTIPLAYER).classList.remove("desaparecer");
    document.getElementById(BOTAO_VOLTAR).classList.remove("desaparecer");
};

function botaoSingleNormal(){
    esteJogo[0]="singlenormal";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    window.location.href="game.html";
};

function botaoSingleInfinito(){
    esteJogo[0]="singleinfinito";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    window.location.href="game.html";
};

function botaoMultiNormal(){
    esteJogo[0]="multinormal";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    window.location.href="game.html";
};

function botaoMultiInfinito(){
    esteJogo[0]="multiInfinito";
    localStorage.setItem('jogocurrente', JSON.stringify(esteJogo));
    window.location.href="game.html";
};