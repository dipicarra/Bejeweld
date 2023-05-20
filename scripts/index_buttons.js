//BOTOES

const BOTAO_LOGIN="btnlogin";
const BOTAO_REGISTER="btnregister";
const BOTAO_SINGLEPLAYER="btnsingleplayer";
const BOTAO_MULTIPLAYER="btnmultiplayer";
const BOTAO_SCOREBOARD="btnscoreboard";
const BOTAO_RULES="btnrules";
const BOTAO_NORMAL="btnnormal";
const BOTAO_INFINITO="btninfinito";
const BOTAO_VOLTAR="btnvoltar";

let JOGOCURRENTE="jogocurrente";
//let esteJogo=localStorage.getItem(JOGOCURRENTE);

console.log(localStorage.getItem(JOGOCURRENTE))

console.log(document.getElementById(BOTAO_LOGIN))

window.addEventListener("load", onload);

function onload() {
    eventlistenerButoes();
}

function eventlistenerButoes(){
    document.getElementById(BOTAO_LOGIN).addEventListener("click", function() {window.location.href='login.html'});
    document.getElementById(BOTAO_REGISTER).addEventListener("click", function() {window.location.href='register.html'});
    document.getElementById(BOTAO_SINGLEPLAYER).addEventListener("click", singleOpcoes);
    document.getElementById(BOTAO_MULTIPLAYER).addEventListener("click", botaoMultiplayer);
    document.getElementById(BOTAO_SCOREBOARD).addEventListener("click", function() {window.location.href='stats.html'});
    document.getElementById(BOTAO_RULES).addEventListener("click", function() {window.location.href='rules.html'});
    document.getElementById(BOTAO_NORMAL).addEventListener("click", botaoNormal);
    document.getElementById(BOTAO_INFINITO).addEventListener("click", botaoInfinito);
    document.getElementById(BOTAO_VOLTAR).addEventListener("click", botaoVoltar);
}

function singleOpcoes(){
    document.getElementById(BOTAO_SINGLEPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_MULTIPLAYER).classList.add("desaparecer");
    document.getElementById(BOTAO_SCOREBOARD).classList.add("desaparecer");
    document.getElementById(BOTAO_RULES).classList.add("desaparecer");
    document.getElementById(BOTAO_NORMAL).classList.remove("desaparecer");
    document.getElementById(BOTAO_INFINITO).classList.remove("desaparecer");
    document.getElementById(BOTAO_VOLTAR).classList.remove("desaparecer");

};

function botaoMultiplayer(){
    esteJogo[0]="multiplayer"

};

function botaoNormal(){};

function botaoInfinito(){};

function botaoVoltar(){
    document.getElementById(BOTAO_SINGLEPLAYER).classList.remove("desaparecer");
    document.getElementById(BOTAO_MULTIPLAYER).classList.remove("desaparecer");
    document.getElementById(BOTAO_SCOREBOARD).classList.remove("desaparecer");
    document.getElementById(BOTAO_RULES).classList.remove("desaparecer");
    document.getElementById(BOTAO_NORMAL).classList.add("desaparecer");
    document.getElementById(BOTAO_INFINITO).classList.add("desaparecer");
    document.getElementById(BOTAO_VOLTAR).classList.add("desaparecer");
};