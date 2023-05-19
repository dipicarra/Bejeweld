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

function Player (user, password, genero, idade, email, logedin){

    this.user=user;
    this.password=password;
    this.genero=genero;
    this.idade=idade;
    this.email=email;
    this.logedin=logedin;
}

window.addEventListener("load", onload);


function onload() {
    PLAYERDETAILS = JSON.parse(localStorage.getItem(PLAYERLIST)) || []

    butoes();
}

function butoes(){

    document.getElementById(BOTAOLOGIN).addEventListener("click", () => {
        testarlogin(String(document.getElementById(NOME).value), String(document.getElementById(PASS).value));
    });
}

function testarlogin (inputUser, inputPass) {
    let existe = false;

    for (let i = 0; i < PLAYERDETAILS.length; i++) {
    const regPlayer = PLAYERDETAILS[i];user
        if (inputUser === String(regPlayer.user) && inputPass === String(regPlayer.password) && String(regPlayer.logedin) === "no") {
            existe = true;
            PLAYERDETAILS[i].logedin="yes";
            localStorage.setItem(PLAYERLIST,JSON.stringify(PLAYERDETAILS));
            window.alert("You just logged in congrats i guess")
            break;
        } 
        else if (regPlayer.LOGEDIN === "no") {
            existe = "logged in";
        }
    }
    if (existe == false) {
        window.alert("This account does not exist, please register.");
    } 
    else if (existe == "logged in") {
        window.alert("This account is already logged in.");
    }
    console.log(PLAYERDETAILS);
}
