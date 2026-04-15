// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initLazyLoading();
});

/**
 * 1. Controle do Cabeçalho ao Rolar
 * Diminui o header ou muda a cor para dar foco ao conteúdo
 */
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '8px 0';
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * 2. Menu Mobile (Hambúrguer)
 * Essencial para que o site seja responsivo em celulares
 */
function initMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const headerContent = document.querySelector('.header-content');

    // Cria o botão hambúrguer dinamicamente se não existir no HTML
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '&#9776;'; // Ícone de três barras
    menuBtn.className = 'menu-mobile-btn';
    
    // Insere o botão no header apenas em telas pequenas via CSS (veja abaixo)
    headerContent.prepend(menuBtn);

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

/**
 * 3. Simulação de Carregamento de Notícias
 * Profissionais usam isso para não travar o site com muitas imagens de uma vez
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Aqui você trocaria um placeholder pela imagem real
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * 4. Função para formatar datas automaticamente
 * Ex: "Publicado há 2 horas"
 */
function formatarDataNoticia(dataIso) {
    const data = new Date(dataIso);
    // Lógica para calcular tempo decorrido pode ser inserida aqui
    return data.toLocaleDateString('pt-BR');
}
