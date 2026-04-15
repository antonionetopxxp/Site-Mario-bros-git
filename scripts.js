// script.js - Código organizado
document.addEventListener('DOMContentLoaded', function() {
    carregarNoticias();
    carregarEventos();
    
    // Formulário de contato
    const form = document.getElementById('formulario-contato');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarContato();
    });
});

// Carregar notícias
async function carregarNoticias() {
    try {
        const response = await fetch('https://api.sulgoiassul.com/noticias');
        const noticias = await response.json();
        
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
        document.getElementById('noticias-container').innerHTML = 
            '<p>Erro ao carregar notícias. Tente novamente mais tarde.</p>';
    }
}

// Carregar eventos
async function carregarEventos() {
    try {
        const response = await fetch('https://api.sulgoiassul.com/eventos');
        const eventos = await response.json();
        
        const container = document.getElementById('eventos-container');
        container.innerHTML = '';
        
        eventos.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.className = 'card';
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

// Enviar contato
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

// Verificação de disponibilidade
async function verificarDisponibilidade() {
    const urls = [
        'https://sulgoiassul.netlify.app',
        'https://api.sulgoiassul.com/noticias',
        'https://api.sulgoiassul.com/eventos'
    ];
    
    for (const url of urls) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (!response.ok) {
                console.error(`Erro em ${url}: ${response.status}`);
            }
        } catch (error) {
            console.error(`Erro em ${url}: ${error.message}`);
        }
    }
}

// Executar verificação diária
setInterval(verificarDisponibilidade, 24 * 60 * 60 * 1000);

// Verificação inicial
verificarDisponibilidade();
