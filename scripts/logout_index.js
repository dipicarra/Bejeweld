/** Dados */

const NOME = "user";
const PASS = "password";
const GENERO = "gender";
const IDADE = "age";
const EMAIL = "email";
const LOGEDIN = "logedin";

/** Lista */

const INDEXNAV = document.getElementById("navindex");
console.log(INDEXNAV);

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
    PLAYERDETAILS = JSON.parse(localStorage.getItem(PLAYERLIST)) || [];
    butoes();
};

function butoes() {
    PLAYERDETAILS.forEach(regPlayer => {
      if (regPlayer.logedin == "yes") {
        let nomeJogador = regPlayer.user;
        let botaoNovo = "<button type='button' class='logoutbuttonIndex' id=" + nomeJogador + ">" + nomeJogador + "</button>";
        INDEXNAV.insertAdjacentHTML("afterbegin", botaoNovo);

        let button = document.getElementById(nomeJogador);

        button.addEventListener("click", () => {
            regPlayer.logedin="no";
            localStorage.setItem(PLAYERLIST,JSON.stringify(PLAYERDETAILS));
            window.alert(nomeJogador+" foi logged out");
            button.remove();
        });
      }
    });
  }
  
