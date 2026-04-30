export function gerarIframePorLink(link) {
    const url = link.toLowerCase();

    if (url.includes('spotify.com')) {
        const regexSpotify = /(track|playlist|album|show|episode)\/([a-zA-Z0-9]+)/i;
        const match = link.match(regexSpotify);

        if (match) {
            const tipo = match[1];
            const id = match[2];  

            const linkEmbed = `https://open.spotify.com/embed/${tipo}/${id}`;
            
            return `<iframe style="border-radius:12px" src="${linkEmbed}" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
        }
    }

    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
        
        const videoId = link.includes('youtu.be/') ? link.split('youtu.be/')[1].split('?')[0] : link.split('v=')[1].split('&')[0]; 
        
        return `<iframe style="border-radius:12px" width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }

    if (url.includes('music.apple.com')) {
        const linkEmbed = url.replace('music.apple.com', 'embed.music.apple.com');
        
        return `<iframe style="border-radius:12px" src="${linkEmbed}" width="100%" height="150" frameBorder="0" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>`;
    }

    return null; 
}