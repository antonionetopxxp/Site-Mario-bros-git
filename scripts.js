const formulario = document.querySelector(".formulario-contato")
const mascara = document.querySelector(".mascara-formulario")

function mostrarForm() {
    formulario.style.left = "50%"
    mascara.style.visibility = "visible"
}

function esconderForm() {
    formulario.style.left = "-300px"
    mascara.style.visibility = "hidden"
}
