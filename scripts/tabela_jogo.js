PECAS=[];

// DEFINIR O TAMANHO DA TABELA

let ALTURA_TABELA=8;
let LARGURA_TABELA=8;

window.addEventListener("load", onload);

const cadaPeca = [
    new peca ("azul","media/por/blueGem.png"),
    new peca ("verde","media/por/greenGem.png"),
    new peca ("laranja","media/por/orangeGem.png"),
    new peca ("roxo","media/por/purpleGem.png"),
    new peca ("vermelho","media/por/redGem.png"),
    new peca ("branco","media/por/whiteGem.png"),
    new peca ("amarelo","media/por/yellowGem.png")
]

function peca (id,imagem){
    this.id=id;
    this.imagem=imagem;
}

function onload() {
    inicializarTabela();
}

function inicializarTabela(){ 
    let tabelaParaHtml = ""
    let tabela=eliminarPecasAMais(desenharTabela());
    tabela.forEach((linha, numeroLinha) => {
        let cadaLinha=""
        linha.forEach((tpeca, numeroTpeca) => {
            cadaLinha += "<td id=" + tpeca["id"] + "> <img src=" + tpeca["imagem"] + "></td>";  
        });
        tabelaParaHtml += "<tr id=" + numeroLinha + ">" + cadaLinha + "</tr>";
    });
    document.getElementById("tabelajogo").innerHTML = tabelaParaHtml;
}

function desenharTabela(){
    let tabela=[];
    for (let i = 0; i < ALTURA_TABELA; i++){
        linha=desenharRow();
        tabela.push(linha);
    }
    return tabela;
}


function desenharRow(){
    let novaLinha=[];
    for (let i = 0; i < LARGURA_TABELA; i++){
        novaLinha.push(generarPeca());
    }
    return novaLinha;
}

function generarPeca(){
    return cadaPeca[Math.floor(Math.random()*cadaPeca.length)];
}

function verSeHaTresEmLinha(tabela){
    let listaDe3EmLinha=[];
    for (let linha=0; linha < tabela.length; linha++){
        for (let tpeca=0; tpeca<tabela[linha].length; tpeca++){
            let contador=1;
            for (let tpecaSeguinte = tpeca+1; tpecaSeguinte < tabela[linha].length; tpecaSeguinte++) {
                if (tabela[linha][tpeca] == tabela[linha][tpecaSeguinte]){
                    contador +=1;
                }
                else{
                    break
                };
            }
            if (contador >= 3){
                listaDe3EmLinha.push([linha,tpeca,contador,tabela[linha][tpeca]["id"]]);
            }
        }
    }
    return listaDe3EmLinha;
}

function eliminarPecasAMais(tabela){

    /**Recebe uma tabela, vê se existe algum 3 ou mais de seguida e 
    elimina todos menos o primeiro para aleatorios (podem ser os mesmos mas
    corre outra vez)*/

    let listaAMais = verSeHaTresEmLinha(tabela);
    console.log(listaAMais);
    while (listaAMais.length > 0){
        for (let aMais=0; aMais<listaAMais.length; aMais++){
            let linhaAmais = listaAMais[aMais][0];
            let pecaAmais = listaAMais[aMais][1];
            let quantas = listaAMais[aMais][2];
            for (let mudar=1; mudar<(quantas); mudar++) {
                console.log(tabela[linhaAmais][pecaAmais+mudar])
                tabela[linhaAmais][pecaAmais+mudar]=generarPeca();
                console.log(tabela[linhaAmais][pecaAmais+mudar])
            }
        listaAMais = verSeHaTresEmLinha(tabela);
        }
    }
    return tabela
}