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
    validateForm()
}

function validateForm(){
    let emailID = document.getElementById(EMAIL).value
    let atpos = emailID.indexOf("@");
    let dotpos = emailID.indexOf(".")
    let username = document.getElementById(NOME).value
    let pass = document.getElementById(PASS).value
    let gen = document.getElementById(GENERO).value
    let Age = document.getElementById(IDADE).value

    if (atpos < 1 || (dotpos - atpos < 2)) {
        alert("Enter a correct email.");
        return false
    } else if (username === ""){
        alert("Enter a correct username.");
    } else if (pass.length < 5) {
        alert("Enter a password with more than 5 caracters.")
    } else if (gen === ""){
        alert("Please select a fitting gender.")
    } else if (Age === ""){
        alert("Please select a fitting age.")
    } else {
        alert("Registered!")
    }
}
