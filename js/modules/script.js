const btnNovaTarefa = document.querySelector('#btn-nova-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');

btnNovaTarefa.addEventListener('click', () => {
    const novaTarefa = document.createElement('div');
    novaTarefa.classList.add('tarefa-item');
    novaTarefa.innerHTML = `
        <input type="checkbox" class="check-concluir">
        <span class="texto-tarefa" style="cursor: pointer;">Nova tarefa</span>
    `;

    listaTarefas.appendChild(novaTarefa);
    const texto = novaTarefa.querySelector('.texto-tarefa');
    const check = novaTarefa.querySelector('.check-concluir');

    texto.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        this.contentEditable = true;
        this.focus();
        this.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
    });

    texto.addEventListener('blur', function() {
        this.contentEditable = false;
        this.style.backgroundColor = "transparent";
    });

    check.addEventListener('change', () => {
        if (check.checked) {
            novaTarefa.style.transition = "0.3s";
            novaTarefa.style.opacity = "0";
            setTimeout(() => novaTarefa.remove(), 300);
        }
    });
});

let estado = "foco";
let duracaoFoco = 25 * 60;
let duracaoPausa = 5 * 60;
let tempoRestante = duracaoFoco;
let intervalo = null;
let rodando = false;

const timerDisplay = document.getElementById("timer");
const btnPlay = document.getElementById("btn-play");
const btnFoco = document.getElementById("btnFoco");
const btnPausa = document.getElementById("btnPausa");

function toggleTimer() {
    if (!rodando) {
        rodando = true;
        btnPlay.textContent = "Pausar";
        intervalo = setInterval(tick, 1000);
    } else {
        rodando = false;
        btnPlay.textContent = "Iniciar";
        clearInterval(intervalo);
    }
}

function tick() {
    if (tempoRestante > 0) {
        tempoRestante--;
        atualizarDisplay();
    } else {
        trocarEstado();
    }
}

function trocarEstado() {
    mudarModo(estado === "foco" ? "pausa" : "foco");
}

function mudarModo(novoEstado) {
    clearInterval(intervalo);
    rodando = false;
    btnPlay.textContent = "Iniciar";
    estado = novoEstado;

    tempoRestante = (estado === "foco") ? duracaoFoco : duracaoPausa;

    atualizarDisplay();
    atualizarUIEstado();
}

function atualizarDisplay() {
    const min = Math.floor(tempoRestante / 60);
    const sec = tempoRestante % 60;
    timerDisplay.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function atualizarUIEstado() {
    btnFoco.classList.toggle("ativo", estado === "foco");
    btnPausa.classList.toggle("ativo", estado === "pausa");
}

function abrirModal() {
    document.getElementById("modal").showModal();
}

function fecharModal() {
    document.getElementById("modal").close();
}

function salvar() {
    const pomodoroVal = parseInt(document.getElementById("pomodoroInput").value);
    const pausaVal = parseInt(document.getElementById("pausaInput").value);
    
    if (!isNaN(pomodoroVal)) duracaoFoco = pomodoroVal * 60;
    if (!isNaN(pausaVal)) duracaoPausa = pausaVal * 60;

    tempoRestante = (estado === "foco") ? duracaoFoco : duracaoPausa;
    
    atualizarDisplay();
    fecharModal();
}

atualizarDisplay();
atualizarUIEstado();