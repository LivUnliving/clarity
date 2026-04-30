export function renderizarPlayer(estado) {
    const containerPlayer = document.getElementById('container-do-player');

    if (estado.htmlIframe) {
        containerPlayer.innerHTML = estado.htmlIframe;
    }
}