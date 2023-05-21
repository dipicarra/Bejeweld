// Grupo: 23 
// Número: 60858 Nome: Diogo Piçarra PL:26
// Número: 51758 Nome: José Lopes PL:26
// Número: 61279 Nome: Vladana Giebler PL:26

/** Dados */

const NOME = "user"
const PASS = "password"
const GENERO = "gender"
const IDADE = "age"
const EMAIL = "email"

/** Butões */

const BOTAOREGISTAR = "btnregistar"
const BOTAOLOGIN = "btnlogin"

/** Lista */

const PLAYERLIST = "playerList"

let PLAYERDETAILS = []

function Player (user, password, genero, idade, email, logedin, stats){

    this.user=user;
    this.password=password;
    this.genero=genero;
    this.idade=idade;
    this.email=email;
    this.logedin=logedin;
    this.stats=stats;
}

window.addEventListener("load", onload);


function onload() {
    butoes();
}

function salvarPlayerStorage() {

    localStorage.setItem(PLAYERLIST,JSON.stringify(PLAYERDETAILS));
}

function butoes(){

    document.getElementById(BOTAOREGISTAR).
    addEventListener("click", addplayerdetails);

    document.getElementById(BOTAOLOGIN).
    addEventListener("click", testarlogin);
}



function addplayerdetails (){

    let player = new Player(document.getElementById(NOME).value,
                        document.getElementById(PASS).value,
                        document.getElementById(GENERO).value,
                        document.getElementById(IDADE).value,
                        document.getElementById(EMAIL).value);

    PLAYERDETAILS.push(player);
    salvarPlayerStorage();
}

function testarlogin () {
    console.log(PLAYERLIST)
}