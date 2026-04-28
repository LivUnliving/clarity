// logic.js
export function gerarIframePorLink(link) {
    // Garantimos que tudo fique em minúsculas para facilitar a busca
    const url = link.toLowerCase();

    // 1. VERIFICAÇÃO DO SPOTIFY (Versão Robusta)
    if (url.includes('spotify.com')) {
        // A expressão regular procura exatamente por track, playlist, album, etc., e pega o código logo depois da barra
        const regexSpotify = /(track|playlist|album|show|episode)\/([a-zA-Z0-9]+)/i;
        const match = link.match(regexSpotify); // Note que usamos o 'link' original aqui para preservar maiúsculas e minúsculas do ID

        if (match) {
            const tipo = match[1]; // Ex: 'track' ou 'playlist'
            const id = match[2];   // Ex: '3n3Ppam7vgaVa1iaRUc9Lp'
            
            // Monta o link limpo e perfeito que o iframe exige
            const linkEmbed = `https://open.spotify.com/embed/${tipo}/${id}`;
            
            return `<iframe style="border-radius:12px" src="${linkEmbed}" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
        }
    }

    // 2. VERIFICAÇÃO DO YOUTUBE
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
        // Extrai o ID do vídeo ignorando parâmetros extras
        const videoId = url.includes('youtu.be/') ? url.split('youtu.be/')[1].split('?')[0] : url.split('v=')[1].split('&')[0]; 
        
        return `<iframe style="border-radius:12px" width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }

    // 3. VERIFICAÇÃO DA APPLE MUSIC
    if (url.includes('music.apple.com')) {
        const linkEmbed = url.replace('music.apple.com', 'embed.music.apple.com');
        
        return `<iframe style="border-radius:12px" src="${linkEmbed}" width="100%" height="150" frameBorder="0" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>`;
    }

    // Retorna nulo se o link for inválido
    return null; 
}