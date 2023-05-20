/** Dados */

const NOME = "user";
const PASS = "password";
const GENERO = "gender";
const IDADE = "age";
const EMAIL = "email";
const LOGEDIN = "logedin";

/** Butões */

const BOTAOLOGIN = "btnlogin";

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

function butoes(){

    document.getElementById(BOTAOLOGIN).addEventListener("click", () => {
        testarlogin(String(document.getElementById(NOME).value), String(document.getElementById(PASS).value));
    });
}

function testarlogin (inputUser, inputPass) {
    let existe = false;
    let contador=0;
    let iCerto=0;

    for (let i = 0; i < PLAYERDETAILS.length; i++) {
    const regPlayer = PLAYERDETAILS[i];
        if (inputUser === String(regPlayer.user) && inputPass === String(regPlayer.password) && String(regPlayer.logedin) === "no") {
            existe = true;
            iCerto=i;
        } 
        else if (String(regPlayer.logedin) === "yes") {
            if(inputUser === String(regPlayer.user) && inputPass === String(regPlayer.password)){
                existe="logged in";
            }
            else{
                contador+=1;
            }
        }
    }
    if (existe == false) {
        window.alert("This account does not exist, please register u dumdum.");
    } 
    else if (existe == "logged in") {
        window.alert(inputUser + " is already logged in.");
    }
    else{
        if (contador > 3){
            window.alert("Too many people logged in.");
        }
        else{
            PLAYERDETAILS[iCerto].logedin="yes";
            localStorage.setItem(PLAYERLIST,JSON.stringify(PLAYERDETAILS));
            window.alert("You just logged in congrats i guess");
        }
    }
}
