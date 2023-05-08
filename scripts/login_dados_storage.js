/** Dados */

const NOME = "user"
const PASS = "password"
const GENERO = "gender"
const IDADE = "age"
const EMAIL = "email"

/** Butões */

const BOTAOLOGIN = "btnlogin"

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

function butoes(){

    document.getElementById(BOTAOLOGIN).
    addEventListener("click", testarlogin);
}

function testarlogin () {
    console.log(PLAYERLIST)
}


function validateLogin(){
    let username = document.getElementById(NOME).value
    let pass = document.getElementById(PASS).value

    if(username === ""){
        alert("Please enter a username.")
    } else if (pass.length < 5 || pass === ""){
        alert("Please enter a password with more than 5 caracters")
    }
}