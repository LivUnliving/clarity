const btnNovaTarefa = document.querySelector('#btn-nova-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');

btnNovaTarefa.addEventListener('click', () => {
    const novaTarefa = document.createElement('div');
    novaTarefa.style.display = "flex";
    novaTarefa.style.alignItems = "center";
    novaTarefa.style.gap = "10px";
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
        this.style.backgroundColor = "#f0f0f0";
        console.log("");
    });

    texto.addEventListener('blur', function() {
        this.contentEditable = false;
        this.style.backgroundColor = "transparent";
    });

    check.addEventListener('change', () => {
        if (check.checked) {
            novaTarefa.style.transition = "0.3s";
            novaTarefa.style.opacity = "0";
            
            setTimeout(() => {
                novaTarefa.remove();
            }, 300);
        }
    });
});