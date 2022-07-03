m = 0;
s = 0;
c = 0;
let clicks = 0;
let acertos = 0;

//Caso false, o jogo não iniciou
jogoIniciou = false;

//Utilizado para evitar que o botão de iniciar seja apertado múltiplas vezes
let contadorJogoIniciado = 0;

//Referenciando constante alvo
const ALVO = document.querySelector("#alvo");

//Criando constante para definir posição aleatória
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

//Define a posição inicial do coisa
ALVO.style.top = "50px";
ALVO.style.left = "50px";
ALVO.style.display = "none";

//Referenciando constante FIXADO (Informações apresentadas após o jogo)
const FIXADO = document.querySelector(".fixed");
FIXADO.style.display = "none";

//Função para controlar o cronômetro
function temporizador() {
  if (jogoIniciou == true) {
    passaTempo();
    setTimeout(temporizador, 10);
  }

  document.getElementById("cronometro").innerHTML = "Tempo: " + s + ":" + c;
}

//Função para aumentar o cronômetro com o passar do tempo
function passaTempo() {
  c++;
  s = parseInt(s);

  if (c == 100) {
    c = 0;
    s++;
  }

  if (c < 10) {
    c = "0" + c;
  }

  if (s < 10) {
    s = "0" + s;
  }

  if (s == 10) {
    pararTempo();
  }
}

function iniciarTempo() {
  if (contadorJogoIniciado == 0) {
    jogoIniciou = true;
    temporizador();
    gerarPosicao();
    ALVO.style.display = "";
    contadorJogoIniciado = 1;
  }
}

function pararTempo() {
  if (jogoIniciou == true) {
    FIXADO.style.display = "";
    ALVO.style.display = "none";
  }
  jogoIniciou = false;
}

function reiniciarTempo() {
  jogoIniciou = false;
  m = 0;
  s = 0;
  c = 0;
  document.getElementById("cronometro").innerHTML = "Tempo: 00:00";
}

function reiniciarPontos() {
  clicks = 0;
  acertos = 0;
  document.getElementById("clicks").innerHTML = clicks;
  document.querySelector("#acertos").innerHTML = acertos;
}

//Contabilizar clique fora do alvo
function onClick() {
  if (jogoIniciou == true) {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
  }
};

//Contabilizar clique no alvo
function aumentarPonto() {
  if (jogoIniciou == true) {
    onClick();
    acertos += 1;
    document.querySelector("#acertos").innerHTML = acertos;
    gerarPosicao();
    new Audio('audio/bonk.mp3').play()
  }
}

function gerarPosicao() {
  ALVO.style.left = getRandom(0, 600 - 40) + 'px';
  ALVO.style.top = getRandom(0, 400 - 53) + 'px';
};

function criarElemento() {
  //Pegando as referências dos elementos HTML
  let lista = document.querySelector("#historico_jogador");
  let nome = document.querySelector("#nome_jogador");

  //Checando se o jogador digitou seu nome
  if(nome.value != ""){
    //Criando um item de lista <li>
    let li = document.createElement("li");
  
    //Atribuindo conteúdo para o <li>
    li.innerHTML = "Nome: " + nome.value + "; Tempo: " + s + ":" + c + "; Acertos: " + acertos + "/" + clicks;
  
    //Associa o item de lista à lista
    lista.appendChild(li);
  
    reiniciarTempo();
    reiniciarPontos();
    contadorJogoIniciado = 0;
    nome.value = "";
    FIXADO.style.display = "none";
  }else{
    alert("Por favor, digite seu nome para salvar a pontuação");
  } 
}
