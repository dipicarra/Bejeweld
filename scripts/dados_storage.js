const NOME = "user"
const PASS = "password"
const GENERO = "gender"
const IDADE = "age"
const EMAIL = "email"
const BOTAOREGISTAR = "btnregistar"

let PLAYERDETAILS = []

function Player (user, password, genero, idade, email){
    this.user=user;
    this.password=password;
    this.genero=genero;
    this.idade=idade;
    this.email=email;
}

function salvarplayerstorage() {
    localStorage.setItem(PLAYERDETAILS);
}

function definequandoreceberdetails(){
    document.getElementById(BOTAOREGISTAR).
    addEventListener("click", addplayerdetails);
}



function addplayerdetails (){

    player = new Player(document.getElementById(NOME),
                        document.getElementById(PASS),
                        document.getElementById(GENERO),
                        document.getElementById(IDADE),
                        document.getElementById(EMAIL),)
}

