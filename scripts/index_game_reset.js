// Grupo: 23 
// Número: 60858 Nome: Diogo Piçarra PL:26
// Número: 51758 Nome: José Lopes PL:26
// Número: 61279 Nome: Vladana Giebler PL:26

let JOGOCURRENTE="jogocurrente"


window.addEventListener("load", onload);

function onload() {
                                                    // modo    pontuacao tempo  se jogou (para ver se deve por no score ou n)
    localStorage.setItem(JOGOCURRENTE,JSON.stringify(["singlenormal",-1,"99:99",false]));
}