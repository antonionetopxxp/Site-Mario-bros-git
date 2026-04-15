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
    
    // Menu móvel
    menuMobile();
});

// Carregar notícias
async function carregarNoticias() {
    try {
        // Mock de dados (substituir por API real)
        const noticias = [
            {
                id: 1,
                titulo: "Conferência de Tecnologia Sul Goiás",
                imagem: "imagens/conferencia.jpg",
                resumo: "O maior evento tecnológico da região acontecerá em julho.",
                data: "20/06/2023",
                link: "noticia1.html"
            },
            {
                id: 2,
                titulo: "Inauguração do Parque Cultural",
                imagem: "imagens/parque.jpg",
                resumo: "Parque cultural será inaugurado com shows e exposições.",
                data: "18/06/2023",
                link: "noticia2.html"
            }
        ];
        
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
        // Mock de eventos (substituir por API real)
        const eventos = [
            {
                id: 1,
                nome: "Festival de Música Regional",
                data: "25/06/2023",
                hora: "19:00",
                local: "Praça Central",
                preco: "Gratuíto"
            },
            {
                id: 2,
                nome: "Feira de Artesanato",
                data: "28/06/2023",
                hora: "10:00",
                local: "Centro Comercial",
                preco: "Gratuíto"
            }
        ];
        
        const container = document.getElementById('eventos-container');
        container.innerHTML = '';
        
        eventos.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.className = 'card';
            eventoDiv.innerHTML = `
                <h3>${evento.nome}</h3>
                <p>Data: ${evento.data}</p>
                <p>Hora: ${evento.hora}</p>
                <p>Local: ${evento.local}</p>
                <p>Preço: ${evento.preco}</p>
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
        
        const response = await fetch('/api/contato', {
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

// Menu móvel
function menuMobile() {
    const menu = document.querySelector('nav');
    const menuBtn = document.createElement('button');
    menuBtn.textContent = '☰';
    menuBtn.className = 'menu-btn';
    
    menu.parentNode.insertBefore(menuBtn, menu.nextSibling);
    
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
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
