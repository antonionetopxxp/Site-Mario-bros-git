// script.js - Versão com API real
document.addEventListener('DOMContentLoaded', function() {
    // Carregamento de notícias
    carregarNoticiasAPI();
    
    // Carregamento de eventos
    carregarEventosAPI();
    
    // Formulário de contato
    const form = document.getElementById('formulario-contato');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarContato();
    });
});

async function carregarNoticiasAPI() {
    try {
        const response = await fetch('https://api.sulgoiassul.com/noticias');
        const noticias = await response.json();
        
        const container = document.getElementById('carregando');
        container.innerHTML = '';
        
        noticias.forEach(noticia => {
            const card = document.createElement('article');
            card.className = 'noticia';
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
        document.getElementById('carregando').innerHTML = 
            '<p>Erro ao carregar notícias. Tente novamente mais tarde.</p>';
    }
}

async function carregarEventosAPI() {
    try {
        const response = await fetch('https://api.sulgoiassul.com/eventos');
        const eventos = await response.json();
        
        const container = document.getElementById('eventos-container');
        
        eventos.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.className = 'evento';
            eventoDiv.innerHTML = `
                <h3>${evento.nome}</h3>
                <p>Data: ${evento.data}</p>
                <p>Local: ${evento.local}</p>
            `;
            container.appendChild(eventoDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        document.getElementById('eventos-container').innerHTML = 
            '<p>Erro ao carregar eventos. Tente novamente mais tarde.</p>';
    }
}

async function enviarContato() {
    try {
        const formData = new FormData(document.getElementById('formulario-contato'));
        const data = Object.fromEntries(formData);
        
        const response = await fetch('https://api.sulgoiassul.com/contato', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('formulario-contato').reset();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        console.error('Erro ao enviar contato:', error);
        alert('Erro ao enviar mensagem. Tente novamente.');
    }
}
