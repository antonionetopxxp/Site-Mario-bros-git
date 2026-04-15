// events.js - Dados reais de eventos
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
    },
    {
        id: 3,
        nome: "Workshop de Programação",
        data: "01/07/2023",
        hora: "14:00",
        local: "Faculdade",
        preco: "R$ 50"
    }
];

// Exportar para uso em outros módulos
export default eventos;



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
// news.js - Dados reais de notícias
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
    },
    {
        id: 3,
        titulo: "Campeonato Municipal de Futebol",
        imagem: "imagens/futebol.jpg",
        resumo: "Campeonato municipal começa na próxima semana.",
        data: "15/06/2023",
        link: "noticia3.html"
    }
];

// Exportar para uso em outros módulos
export default noticias;
