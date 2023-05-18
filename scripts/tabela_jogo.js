// Grupo: 23 -->
//Número: 60858 Nome: Diogo Piçarra PL:26-->
//Número:  Nome: José Lopes PL:26-->
//Número:  Nome: Vladana Giebler PL:26-->

// DEFINIR O TAMANHO DA TABELA

let ALTURA_TABELA=8;
let LARGURA_TABELA=8;

var peca_clicada=null;

var jogo=[];

var pontuacao = 0;

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
    let tabelaParaHtml = "";
    jogo=eliminarPecasAMais(desenharTabela());
    jogo.forEach((linha, numeroLinha) => {
        let cadaLinha="";
        linha.forEach((tpeca, numeroTpeca) => {
            cadaLinha += "<td id=" + numeroTpeca + 
            "> <img style=width:50px; height:50px id='" + numeroLinha + numeroTpeca + "' src=" + tpeca["imagem"] +
            "></td>";
        });
        tabelaParaHtml += "<tr id=" + numeroLinha + ">" + cadaLinha + "</tr>";
    });
    document.getElementById("tabelajogo").innerHTML = tabelaParaHtml;
    
    // Adicionar eventlisteners a cada peça

    jogo.forEach((linha, numeroLinha) => {
        linha.forEach((tpeca, numeroTpeca) => {
            const imageId = numeroLinha + numeroTpeca;
            const image = document.getElementById(imageId);
            image.addEventListener("click", function(){
                image.parentNode.classList.add("clicked");
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
        let tempjogo=jogo[parseInt(imageId[0])][parseInt(imageId[1])];
        jogo[parseInt(imageId[0])][parseInt(imageId[1])]=jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])];
        jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])]=tempjogo;

        if (verSeHaTresEmLinha(jogo)>0){
            let pecaAntiga=document.getElementById(peca_clicada);
            let pecaNova=document.getElementById(imageId);
            pecaNova.parentNode.classList.remove("clicked");
            pecaAntiga.parentNode.classList.remove("clicked");
            
            let temp=pecaNova.src;
            pecaNova.src=pecaAntiga.src;
            pecaAntiga.src=temp;
            
            peca_clicada=null;
            capturarpecas();
        }
        else{
            let tempjogo = jogo[parseInt(imageId[0])][parseInt(imageId[1])];
            jogo[parseInt(imageId[0])][parseInt(imageId[1])] = jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])];
            jogo[parseInt(peca_clicada[0])][parseInt(peca_clicada[1])] = tempjogo;
        }
    }
    else{
        let pecaAntiga=document.getElementById(peca_clicada);
        let pecaNova=document.getElementById(imageId);
        pecaNova.parentNode.classList.remove("clicked");
        pecaAntiga.parentNode.classList.remove("clicked");
        peca_clicada=null;
    }
}

function verSePecaAdjacente(pecaAntiga,pecaNova){
    let resultado=false
    if (pecaAntiga[0] == pecaNova[0] &&
        (Math.abs(parseInt(pecaAntiga[0])-parseInt(pecaNova[1])))==1){
            resultado=true;
        }
    else if (pecaAntiga[1] == pecaNova[1] &&
        (Math.abs(parseInt(pecaAntiga[0])-parseInt(pecaNova[0])))==1){
            resultado=true;
        }
    return resultado;
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

function capturarpecas(){

    let emLinha=verSeHaTresEmLinha(jogo);

    while (emLinha.length>0){

    }
}