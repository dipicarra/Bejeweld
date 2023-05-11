PECAS=[];

const cadaPeca = [
    new peca ("azul","media/por/blueGem.png"),
    new peca ("verde","media/por/greenGem.png"),
    new peca ("laranja","media/por/orangeGem.png"),
    new peca ("roxo","media/por/purpleGem.png"),
    new peca ("vermelho","media/por/redGem.png"),
    new peca ("branco","media/por/whiteGem.png"),
    new peca ("amarelo","media/por/yellowGem.png")
]

window.addEventListener("load", onload);

function onload() {
    desenharTabela()
}

function peca (id,imagem){
    this.id=id
    this.imagem=imagem
}

function desenharTabela(){
    tabela=[]
    for (let i = 0; i < 8; i++){
        linha=desenharRow()
        tabela.push("<tr>"+linha+"</tr>")
    }
    document.getElementById("tabelajogo").innerHTML = tabela;
}

function desenharRow(){
    linha=[]
    for (let i = 0; i < 8; i++){
        return linha.push("<td>"+ PECAS.forEach((Math.floor(Math.random() * 8)) + "</td>"))
    }
}