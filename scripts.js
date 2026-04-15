// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Carregamento de notícias
    carregarNoticias();
    
    // Carregamento de eventos
    carregarEventos();
    
    // Formulário de contato
    const form = document.getElementById('formulario-contato');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso!');
        form.reset();
    });
});

async function carregarNoticias() {
    try {
        // Mock de dados (substituir por API real)
        const noticias = [
            {
                id: 1,
                titulo: "Notícia 1",
                imagem: "imagens/noticia1.jpg",
                resumo: "Resumo da notícia 1...",
                data: "15/06/2023"
            },
            {
                id: 2,
                titulo: "Notícia 2",
                imagem: "imagens/noticia2.jpg",
                resumo: "Resumo da notícia 2...",
                data: "14/06/2023"
            }
        ];
        
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
                <a href="#" onclick="verNoticia(${noticia.id})">Leia mais</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
    }
}

function verNoticia(id) {
    // Exemplo de navegação para detalhes
    window.location.href = `detalhes.html?id=${id}`;
}

async function carregarEventos() {
    try {
        // Mock de eventos (substituir por API real)
        const eventos = [
            {
                id: 1,
                nome: "Evento 1",
                data: "20/06/2023",
                local: "Local 1"
            },
            {
                id: 2,
                nome: "Evento 2",
                data: "22/06/2023",
                local: "Local 2"
            }
        ];
        
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
    }
}

// Função para carregar imagens de forma lazy
function carregarImagensLazy() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Iniciar lazy loading quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarImagensLazy);
