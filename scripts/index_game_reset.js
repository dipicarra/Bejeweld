let JOGOCURRENTE="jogocurrente"


window.addEventListener("load", onload);

function onload() {
    localStorage.setItem(JOGOCURRENTE,JSON.stringify(["singlenormal",-1,"99:99"]));
}