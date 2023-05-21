// Grupo: 23 
// Número: 60858 Nome: Diogo Piçarra PL:26
// Número: 51758 Nome: José Lopes PL:26
// Número: 61279 Nome: Vladana Giebler PL:26

/** Dados */

const NOME = "user";
const PASS = "password";
const GENERO = "gender";
const IDADE = "age";
const EMAIL = "email";
const LOGEDIN = "logedin";

/** Butões */

const BOTAOREGISTAR = "btnregistar";

/** Lista */

const PLAYERLIST = "playerList";

let PLAYERDETAILS = [];

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
    PLAYERDETAILS = JSON.parse(localStorage.getItem(PLAYERLIST)) || [];
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
                        document.getElementById(EMAIL).value,
                        "no",
                        {"games": 0,
                        "time": 0,
                        "maxscore": 0}
                        );
    let existe=false;

    PLAYERDETAILS.forEach(regPlayer => {
        if (regPlayer.user==player.user){
            existe="user";
            if (regPlayer.email==player.email){
                existe+="email";
            }}
        else if (regPlayer.email==player.email){
            existe="email";
        }
    });
    if (existe==false){
        PLAYERDETAILS.push(player);
        salvarPlayerStorage();
        window.alert("Registerd.");
    }
    else if (existe=="user"){
        window.alert("That username is unavailable.");
    }
    else if (existe=="email"){
        window.alert("That email is already in use.");
    }
    else if (existe=="useremail"){
        window.alert("That email and username are unavailable.");
    }
}

