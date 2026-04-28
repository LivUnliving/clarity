// ui.js
export function renderizarPlayer(estado) {
    const containerPlayer = document.getElementById('container-do-player');

    // Se houver conteúdo no estado, injeta no container
    if (estado.htmlIframe) {
        containerPlayer.innerHTML = estado.htmlIframe;
    }
}