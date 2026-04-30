import { gerarIframePorLink } from './logic.js';
import { renderizarPlayer } from './ui.js';

const LINK_PADRAO = "https://open.spotify.com/playlist/37i9dQZF1E4yzIYT5qw6EX?si=a14d0feafa614a8d"; 

let estado = {
    playerAtivo: true,
    htmlIframe: gerarIframePorLink(LINK_PADRAO)
};

function atualizarEstado(novoEstado) {
    estado = { ...estado, ...novoEstado }; 
    renderizarPlayer(estado);              
}

renderizarPlayer(estado);

const formulario = document.getElementById('form-link');
const inputUrl = document.getElementById('urlUsuario');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); 
    const link = inputUrl.value;
    const resultadoIframe = gerarIframePorLink(link);

    if (resultadoIframe) {
        atualizarEstado({ 
            playerAtivo: true, 
            htmlIframe: resultadoIframe 
        });
        inputUrl.value = ''; 
    } else {
        alert("Plataforma não suportada!");
    }
});