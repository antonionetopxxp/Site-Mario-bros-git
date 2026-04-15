// script.js - Substituição total
async function carregarNoticias() {
    try {
        const response = await fetch('https://api.sulgoiassul.com/noticias');
        const noticias = await response.json();
        
        // Substituir todas as notícias
        const container = document.getElementById('noticias-container');
        container.innerHTML = '';
        
        noticias.forEach(noticia => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${noticia.imagem}" alt="${noticia.titulo}">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.data}</p>
                <p>${noticia.resumo}</p>
                <a href="${noticia.link}">Leia mais</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        // Manter notícias antigas em caso de erro
        console.log('Mantendo notícias antigas...');
    }
}
