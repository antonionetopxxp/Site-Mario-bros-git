

// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: './dist',
        hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        // Plugins adicionais
    ]
};






// mocha-tests.js - Testes com Mocha
describe('Funcionalidades do Site', function() {
    describe('Carregamento de Notícias', function() {
        it('deve carregar notícias da API', async function() {
            this.timeout(5000);
            
            const container = document.getElementById('carregando');
            await carregarNoticiasAPI();
            
            expect(container.innerHTML).to.include('<article');
        });
        
        it('deve mostrar mensagem de erro em caso de falha', async function() {
            this.timeout(5000);
            
            const container = document.getElementById('carregando');
            await carregarNoticiasAPI();
            
            expect(container.innerHTML).to.include('Erro ao carregar notícias');
        });
    });
    
    describe('Carregamento de Eventos', function() {
        it('deve carregar eventos da API', async function() {
            this.timeout(5000);
            
            const container = document.getElementById('eventos-container');
            await carregarEventosAPI();
            
            expect(container.innerHTML).to.include('<div class="evento">');
        });
    });
    
    describe('Envio de Contato', function() {
        it('deve enviar formulário de contato', async function() {
            this.timeout(5000);
            
            const form = document.getElementById('formulario-contato');
            const originalSubmit = form.addEventListener;
            
            let submitCalled = false;
            form.addEventListener = function(event, callback) {
                if (event === 'submit') {
                    submitCalled = true;
                    return originalSubmit.call(this, event, callback);
                }
                return originalSubmit.apply(this, arguments);
            };
            
            const event = new Event('submit', { cancelable: true });
            form.dispatchEvent(event);
            
            setTimeout(() => {
                expect(submitCalled).to.be.true;
                form.addEventListener = originalSubmit;
            }, 100);
        });
    });
});


// tests.js - Testes automatizados
function testCarregarNoticias() {
    const container = document.getElementById('carregando');
    carregarNoticiasAPI().then(() => {
        if (container.innerHTML.includes('<article')) {
            console.log('✓ Teste de carregamento de notícias: PASSOU');
        } else {
            console.log('✗ Teste de carregamento de notícias: FALHOU');
        }
    }).catch(error => {
        console.log('✗ Teste de carregamento de notícias: FALHOU -', error);
    });
}

function testCarregarEventos() {
    const container = document.getElementById('eventos-container');
    carregarEventosAPI().then(() => {
        if (container.innerHTML.includes('<div class="evento">')) {
            console.log('✓ Teste de carregamento de eventos: PASSOU');
        } else {
            console.log('✗ Teste de carregamento de eventos: FALHOU');
        }
    }).catch(error => {
        console.log('✗ Teste de carregamento de eventos: FALHOU -', error);
    });
}

function testEnviarContato() {
    const form = document.getElementById('formulario-contato');
    const originalSubmit = form.addEventListener;
    
    let submitCalled = false;
    form.addEventListener = function(event, callback) {
        if (event === 'submit') {
            submitCalled = true;
            return originalSubmit.call(this, event, callback);
        }
        return originalSubmit.apply(this, arguments);
    };
    
    // Simular envio do formulário
    const event = new Event('submit', { cancelable: true });
    form.dispatchEvent(event);
    
    setTimeout(() => {
        if (submitCalled) {
            console.log('✓ Teste de envio de contato: PASSOU');
        } else {
            console.log('✗ Teste de envio de contato: FALHOU');
        }
        form.addEventListener = originalSubmit;
    }, 100);
}

// Executar todos os testes
testCarregarNoticias();
testCarregarEventos();
testEnviarContato();



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
// analytics.js - Funções de rastreamento
function rastrearPagina(nomePagina) {
    gtag('config', 'G-XXXXXXXXXX', {
        page_title: nomePagina,
        page_location: window.location.href
    });
}

function rastrearClique(elemento, categoria) {
    gtag('event', 'click', {
        event_category: categoria,
        event_label: elemento.textContent
    });
}

function rastrearFormulario(form, acao) {
    gtag('event', 'submit', {
        event_category: 'form',
        event_label: acao
    });
}

// Exemplo de uso
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        rastrearClique(link, 'links');
    });
});


// Exportar para uso em outros módulos
export default noticias;
