PECAS=[];

// DEFINIR O TAMANHO DA TABELA

ALTURA_TABELA=8;
LARGURA_TABELA=8;

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
    tabelaParaHtml = ""
    tabela=desenharTabela();
    tabela.forEach((linha, numeroLinha) => {
        cadaLinha=""
        linha.forEach((tpeca, numeroTpeca) => {
            cadaLinha += "<td id=" + tpeca["id"] + "> <img src=" + tpeca["imagem"] + "></td>";  
        });
        tabelaParaHtml += "<tr id=" + numeroLinha + ">" + cadaLinha + "</tr>";
    });
    console.log(tabelaParaHtml);
    document.getElementById("tabelajogo").innerHTML = tabelaParaHtml;
}

function desenharTabela(){
    tabela=[];
    for (let i = 0; i < ALTURA_TABELA; i++){
        linha=desenharRow();
        tabela.push(linha);
    }
    return tabela;
}


function desenharRow(){
    novaLinha=[];
    for (let i = 0; i < LARGURA_TABELA; i++){
        novaLinha.push(generarPeca());
        novaLinha = verSeHaTresEmLinha(novaLinha);
    }
    return novaLinha;
}

function generarPeca(){
    return cadaPeca[Math.floor(Math.random()*cadaPeca.length)];
}

function verSeHaTresEmLinha(linha){
    for (let i=0; i < linha.lenght; i++){
        if (linha[i] == linha[i+1]){
            linha.pop(i+1);
            linha.push(generarPeca());
            verSeHaTresEmLinha(linha);
        }
    }
    return linha;
}