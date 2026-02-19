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

/* --- JavaScript --- */
        function toggleMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            
            // Adiciona ou remove a classe 'active'
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');

            // Impede o scroll da página quando o menu está aberto
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    </script>

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
