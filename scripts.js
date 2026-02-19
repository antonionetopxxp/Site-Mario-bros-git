const formulario = document.querySelector(".formulario-contato")
const mascara = document.querySelector(".mascara-formulario")

function mostrarForm() {
    formulario.style.left = "50%"
    mascara.style.visibility = "visible"
}

const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Função para abrir
openMenu.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
});

// Função para fechar
const closeFunc = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Libera o scroll
};

closeMenu.addEventListener('click', closeFunc);
overlay.addEventListener('click', closeFunc);
});

// Função para fechar
const closeFunc = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Libera o scroll
};

closeMenu.addEventListener('click', closeFunc);
overlay.addEventListener('click', closeFunc);


function esconderForm() {
    formulario.style.left = "-300px"
    mascara.style.visibility = "hidden"
}
