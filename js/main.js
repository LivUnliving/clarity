// main.js
import { gerarIframePorLink } from './logic.js';
import { renderizarPlayer } from '../../js/ui.js';
// Link padrão
const LINK_PADRAO = "https://open.spotify.com/playlist/3Z8RxqQVHdxyFLt5Ewe1FX?si=7a7b413ffdc04fcf"; 

let estado = {
    playerAtivo: true,
    htmlIframe: gerarIframePorLink(LINK_PADRAO)
};

// 3. FUNÇÃO CENTRAL DE ATUALIZAÇÃO (Padrão State -> Render)
function atualizarEstado(novoEstado) {
    estado = { ...estado, ...novoEstado }; 
    renderizarPlayer(estado);              
}

// 4. INICIALIZAÇÃO: Renderiza o player padrão logo que a página carrega
renderizarPlayer(estado);

// 5. EVENTOS (Permanece igual, permitindo a troca pelo usuário)
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