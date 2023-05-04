/** Dados */

const NOME = "user"
const PASS = "password"
const GENERO = "gender"
const IDADE = "age"
const EMAIL = "email"

/** Butões */

const BOTAOREGISTAR = "btnregistar"

/** Lista */

const PLAYERLIST = "playerList"

let PLAYERDETAILS = []

function Player (user, password, genero, idade, email){

    this.user=user;
    this.password=password;
    this.genero=genero;
    this.idade=idade;
    this.email=email;
}

window.addEventListener("load", onload);


function onload() {
    PLAYERDETAILS = JSON.parse(localStorage.getItem(PLAYERLIST)) || []
    butoes();
}

function salvarPlayerStorage() {

    localStorage.setItem(PLAYERLIST,JSON.stringify(PLAYERDETAILS));
}

function butoes(){

    document.getElementById(BOTAOREGISTAR).
    addEventListener("click", addplayerdetails);
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

