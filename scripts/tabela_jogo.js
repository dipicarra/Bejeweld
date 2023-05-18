// Grupo: 23 -->
//Número: 60858 Nome: Diogo Piçarra PL:26-->
//Número:  Nome: José Lopes PL:26-->
//Número:  Nome: Vladana Giebler PL:26-->

// DEFINIR O TAMANHO DA TABELA

let ALTURA_TABELA=8;
let LARGURA_TABELA=8;

var peca_clicada=null;

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
            cadaLinha += "<td id=" + tpeca["id"]+ 
            "> <img style='width:50px; height:50px' class= 'not-clicked' id='peca"+ numeroLinha + numeroTpeca + "'src=" + tpeca["imagem"]+
            "></td>";
        });
        tabelaParaHtml += "<tr id=" + numeroLinha + ">" + cadaLinha + "</tr>";
    });
    document.getElementById("tabelajogo").innerHTML = tabelaParaHtml;
    
    // Adicionar eventlisteners a cada peça

    tabela.forEach((linha, numeroLinha) => {
        linha.forEach((tpeca, numeroTpeca) => {
            const imageId = "peca" + numeroLinha + numeroTpeca
            const image = document.getElementById(imageId);
            image.addEventListener("click", function(){
                moverPeca(imageId);
            });
    });
  });
}

function moverPeca(imageId) {
    if (peca_clicada==null){
        peca_clicada = imageId;
    }
    else if (verSePecaAdjacente(peca_clicada,imageId)==true){
        console.log("Image clicked:", imageId, verSePecaAdjacente(peca_clicada,imageId));
        let pecaAntiga=document.getElementById(peca_clicada);
        let pecaNova=document.getElementById(imageId);
        let temp=pecaNova.src;
        pecaNova.src=pecaAntiga.src;
        pecaAntiga.src=temp;
        peca_clicada=null
    }
    else{
        peca_clicada=null
    }
}

function verSePecaAdjacente(pecaAntiga,pecaNova){
    let resultado=false
    if (pecaAntiga[pecaAntiga.length-2] == pecaNova[pecaNova.length-2] &&
        (Math.abs(parseInt(pecaAntiga[pecaAntiga.length-1])-parseInt(pecaNova[pecaNova.length-1])))==1){
            resultado=true;
        }
    else if (pecaAntiga[pecaAntiga.length-1] == pecaNova[pecaNova.length-1] &&
        (Math.abs(parseInt(pecaAntiga[pecaAntiga.length-2])-parseInt(pecaNova[pecaNova.length-2])))==1){
            resultado=true;
        }
    return resultado
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
    /** isto funciona para mais de 3 mas n me aptece mudar o nome da funcao
    o return vai ser uma lista que contem listas com a nº linha, nº da peça, quantas de seguida, e o tipo de peça  */ 

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
    while (listaAMais.length > 0){
        for (let aMais=0; aMais<listaAMais.length; aMais++){
            let linhaAmais = listaAMais[aMais][0];
            let pecaAmais = listaAMais[aMais][1];
            let quantas = listaAMais[aMais][2];
            for (let mudar=1; mudar<(quantas); mudar++) {
                tabela[linhaAmais][pecaAmais+mudar]=generarPeca();
            }
        listaAMais = verSeHaTresEmLinha(tabela);
        }
    }
    return tabela
}