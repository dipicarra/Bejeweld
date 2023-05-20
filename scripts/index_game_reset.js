let JOGOCURRENTE="jogocurrente"


window.addEventListener("load", onload);

function onload() {
                                                    // modo    pontuacao tempo  se jogou (para ver se deve por no score ou n)
    localStorage.setItem(JOGOCURRENTE,JSON.stringify(["singlenormal",-1,"99:99",false]));
}