/** Dados */

const NOME = "user";
const PASS = "password";
const GENERO = "gender";
const IDADE = "age";
const EMAIL = "email";
const LOGEDIN = "logedin";

/** Lista */

const INDEXNAV = document.getElementById("navindex");

const PLAYERLIST = "playerList";

let PLAYERDETAILS = [];

/** BOTOES */

const BOTAOSINGLE = "btnsingleplayer";
const BOTAOMULTI = "btnmultiplayer";

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
    mostrarJogos();
};

function butoes() {
    PLAYERDETAILS.forEach(regPlayer => {
        if (regPlayer.logedin == "yes") {
            let nomeJogador = regPlayer.user;
            let botaoNovo = "<button type='button' class='logoutbuttonIndex' id=" + nomeJogador + ">" + nomeJogador + "</button>";
            INDEXNAV.insertAdjacentHTML("afterbegin", botaoNovo);

            let button = document.getElementById(nomeJogador);

            button.addEventListener("click", () => {
                let resultado = confirm("Stats do jogador " + nomeJogador+":\nNúmero de jogos: " + regPlayer.stats['games']+
                                        "\nTempo total jogado: "+ regPlayer.stats['time']+
                                        "\nPontuação máxima: "+ regPlayer.stats['maxscore']+
                                        "\n\nPretende dar Log out?");
                if (resultado){
                    regPlayer.logedin="no";
                    localStorage.setItem(PLAYERLIST,JSON.stringify(PLAYERDETAILS));
                    window.alert(nomeJogador+" foi logged out");
                    button.remove();
                    mostrarJogos();
                }
                
            });
        }
    });
};
  
function mostrarJogos(){
    let jogadoresLogin=0;
    PLAYERDETAILS.forEach(regPlayer => {
        if (regPlayer.logedin == "yes"){
            jogadoresLogin+=1;
        }
    });
    if (jogadoresLogin==2){
        document.getElementById(BOTAOSINGLE).disabled=true;
        document.getElementById(BOTAOMULTI).disabled=false;
    }
    else if (jogadoresLogin==1){
        document.getElementById(BOTAOMULTI).disabled=true;
        document.getElementById(BOTAOSINGLE).disabled=false;
    }
    else {
        document.getElementById(BOTAOMULTI).disabled=true;
        document.getElementById(BOTAOSINGLE).disabled=true;
    }

};