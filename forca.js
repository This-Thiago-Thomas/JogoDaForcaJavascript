var biblioteca = ["cachorro", "gato", "papagaio", "azul", "vermelho", "rosa", "tijolo", "predio", "celular", "teclado", "computador"];
var dcs = ["Animais", "Animais", "Animais", "Cores", "Cores", "Cores", "Construção", "Construção", "Tecnologia", "Tecnologia", "Tecnologia"];
var qtde = biblioteca.length - 1;
var pos = Math.round(Math.random() * qtde);
var palavra = biblioteca[pos];
var dicas = dcs[pos];
var tam = palavra.length;
var cxLetras = [];
var acertos;
var errosMax = 7;
var erros = 0;
var desenho = [];
var acertou = false;
var jogando = false;
var jog;

function defineLetras(l) {
    var obj;
    for (var i = 0; i < 20; i++) {
        obj = document.getElementById("letra" + i).value = "";
        obj = document.getElementById("letra" + i).style.display = "none";
    }
    for (var i = 0; i < l; i++) {
        obj = document.getElementById("letra" + i).style.display = "inline-block";
    }
}

function jogar() {
    jog = document.getElementById("letraj");
    jog.focus();
    if (jog.value == "") {
        alert("Digite a letra");
    }
    else {
        if (jogando) {
            var obj;
            var letraTmp;
            var letra;
            var pesq;
            letra = jog.value;
            jog.value = "";
            acertou = false;
            pesq = palavra.match(letra);
            document.getElementById("dvletrasdigitadas").innerHTML += letra.toUpperCase() + " ";
            while (pesq != null) {
                letraTmp = palavra.search(letra);
                obj = document.getElementById("letra" + letraTmp).value = letra;
                palavra = palavra.replace(letra, '0');
                acertos++;
                pesq = palavra.match(letra);
                acertou = true;
            }
            if (!acertou) {
                erros++;

                if (erros < 7) {
                    desenho[erros].style.display = "block";
                }
                else {
                    document.getElementById("cabeca").src = "imgs/cabeca2.png";
                    document.getElementById("dvmsg").innerHTML = "<strong>PERDEU</strong>";
                    jogando = false;
                }
            }
            if (acertos == tam) {
                document.getElementById("dvmsg").innerHTML = "";
                document.getElementById("dvmsg").innerHTML = "<strong>GANHOU</strong>";
                jogando = false;
            }
        }
    }
}

function inicia() {
    jogando = true;
    jog = document.getElementById("letraj");
    jog.value = "";
    jog.focus();
    acertos = 0;
    erros = 0;
    acertou = false;
    document.getElementById("dvletrasdigitadas").innerHTML = " ";
    pos = Math.round(Math.random() * qtde);
    palavra = biblioteca[pos];
    tam = palavra.length;
    dicas = dcs[pos];
    defineLetras(tam);
    document.getElementById("dvmsg").innerHTML = "";
    desenho[1] = document.getElementById("cabeca");
    desenho[2] = document.getElementById("corpo");
    desenho[3] = document.getElementById("bracoe");
    desenho[4] = document.getElementById("bracod");
    desenho[5] = document.getElementById("pernae");
    desenho[6] = document.getElementById("pernad");
    document.getElementById("cabeca").src = "imgs/cabeca.png";
    for (var i = 1; i < 7; i++) {
        desenho[i].style.display = "none";
    }
    for (var i = 0; i < 20; i++) {
        document.getElementById("letra" + i).setAttribute('readonly', true);
    }
    addEventListener("keydown", verificatecla);

}

function verificatecla() {
    var tecla = event.keyCode;
    if (tecla == 13) {
        jogar();
    }
}

function Dica() {
    alert(dicas);
    jog.focus();
}

window.addEventListener("load", inicia);