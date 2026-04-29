
let estado = "foco";
let duracaoFoco = 25 * 60;
let duracaoPausa = 5 * 60;

let tempoRestante = duracaoFoco;
let intervalo = null;
let rodando = false;


function toggleTimer() {
  const botao = document.getElementById("btn");

  if (!rodando) {
    rodando = true;
    botao.textContent = "Pausar";

    intervalo = setInterval(tick, 1000);
  } else {
    rodando = false;
    botao.textContent = "Iniciar";
    clearInterval(intervalo);
  }
}

function tick() {
  tempoRestante--;
  atualizarDisplay();

  if (tempoRestante <= 0) {
    trocarEstado();
  }
}


function trocarEstado() {
  if (estado === "foco") {
    mudarModo("pausa");
  } else {
    mudarModo("foco");
  }
}


function mudarModo(novoEstado) {

  clearInterval(intervalo);
  rodando = false;
  document.getElementById("btn").textContent = "Iniciar";

  estado = novoEstado;

  tempoRestante = (estado === "foco")
    ? duracaoFoco
    : duracaoPausa;

  atualizarDisplay();
  atualizarUIEstado();
}


function atualizarDisplay() {
  const min = Math.floor(tempoRestante / 60);
  const sec = tempoRestante % 60;

  document.getElementById("timer").textContent =
    `${min}:${sec < 10 ? "0" : ""}${sec}`;
}


function atualizarUIEstado() {
  const foco = document.getElementById("btnFoco");
  const pausa = document.getElementById("btnPausa");
  foco.classList.toggle("ativo", estado === "foco");
  pausa.classList.toggle("ativo", estado === "pausa");
}


function abrirModal() {
    document.getElementById("modal").showModal();
}

function fecharModal(){
    document.getElementById("modal").close();
}

function salvar(){
    const pomodoro = parseInt(document.getElementById("pomodoroInput").value);
    const pausa = parseInt(document.getElementById("pausaInput").value);
    duracaoFoco = pomodoro * 60;
    duracaoPausa = pausa * 60;
    tempoRestante = (estado === "foco")
        ? duracaoFoco
        : duracaoPausa;
    atualizarDisplay();
    fecharModal();
}

atualizarDisplay();
atualizarUIEstado();