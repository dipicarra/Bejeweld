const NOME = "user"
const PASS = "password"
const GENERO = "gender"
const IDADE = "age"
const EMAIL = "email"
const BOTAOREGISTAR = "btnregistar"
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
    console.log("load")
    defineQuandoReceberDetails()
}

function salvarPlayerStorage() {
    console.log("salvar")
    localStorage.setItem(PLAYERLIST,JSON.stringify(PLAYERDETAILS));
}

function defineQuandoReceberDetails(){
    console.log("definir")
    document.getElementById(BOTAOREGISTAR).
    addEventListener("click", addplayerdetails);
}



function addplayerdetails (){

    console.log("addplayer")

    let player = new Player(document.getElementById(NOME).value,
                        document.getElementById(PASS).value,
                        document.getElementById(GENERO).value,
                        document.getElementById(IDADE).value,
                        document.getElementById(EMAIL).value);

    PLAYERDETAILS.push(player);
    salvarPlayerStorage();
}

