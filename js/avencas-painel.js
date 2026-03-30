//pegar elementos via DOM 

let btnAvencasAtivas = document.querySelector(".btn-avencas-ativas")
let btnAvencasExpiradas = document.querySelector(".btn-avencas-expiradas")
let btnNotificacoes = document.querySelector("#btn-notificacoes")
let btnUsuario = document.querySelector("#btn-usuario")
let btnNaoSair = document.querySelector(".nao-sair")
let btnSimSair = document.querySelector(".sim-sair")
let btnRelatorio = document.querySelector(".div-banner-relatorio button")
let btnGerirAvencas = document.querySelector(".li-estacionamento .i-rolo")
let btnsAvencasCard = document.querySelectorAll("li[name=avencas-card] .btn")




let modalAvencasAtivas = document.querySelector(".modal-avencas")
let modalSair = document.querySelector(".sair-da-conta")


let textoAvencasAtivas = document.querySelector(".div-rolo-span span")
let textoTotalAvencasContratos = document.querySelector("li .total-contratos-valor")
let textoTotalAvencasAtivas = document.querySelector("li .total-avencas-ativas")
let textoTotalAvencasExpiradas = document.querySelector("li .total-avencas-expiradas")


let divAtivo = document.querySelector(".div-circulo")
let cardNoticicaoes = document.querySelector(".notificacoes")
let iconeAvencas = document.querySelector(".div-icone i")
let iconeUsuario = document.querySelector("#icone-usuario")
let usuarioNome = document.querySelector(".usuario-nome")

let modalTotalPerc = document.querySelector(".div-valores-perc span")
let avencasAtivasTotal = document.querySelector(".div-valores-perc p")

let avencasAtivasTotalPerc = document.querySelector(".avencas-ativas-perc")
let avencasExpiradasTotalPerc = document.querySelector(".avencas-expiradas-perc")


//pegar elementos por parques
let parqueTerrio = document.querySelector(".terrio-valor")
let parqueCave = document.querySelector(".cave-valor")
let parqueCipDomestico = document.querySelector(".cip-domestico-valor")
let parqueCipInternacional = document.querySelector(".cip-internacional-valor")
let parqueTaxi = document.querySelector(".taxi-valor")
let parqueAutocarro = document.querySelector(".autocarros-valor")

//pegar dados do banco
let store = JSON.parse(localStorage.getItem("usuarios")) || []

import { clientesComEstado } from "./dataset.js"


const mostrarNomeDeUsuario = function (usuario) {
    usuarioNome.textContent = usuario
}

mostrarNomeDeUsuario("abelardesneto")



//ir para pagina Gerir a avenças

btnGerirAvencas.addEventListener("click", function () {
    window.location.href = "../main/gerir-avencas.html"
})
//adicionando totas aos cards 
const adicionarTotalCards = function () {

    let avencasTotal = textoTotalAvencasContratos.textContent = clientesComEstado.length

    let avencasAtivasTotal = textoTotalAvencasAtivas.textContent = clientesComEstado.filter(({ estado }) => estado.trim() === "Ativo").length

    let avencasExpiradasTotal = textoTotalAvencasExpiradas.textContent = clientesComEstado.filter(({ estado }) => estado.trim() === "Expirado").length


    avencasAtivasTotalPerc.textContent = (avencasAtivasTotal / avencasTotal * 100).toFixed() + "%"
    avencasExpiradasTotalPerc.textContent = (avencasExpiradasTotal / avencasTotal * 100).toFixed() + "%"
}
adicionarTotalCards()



//abrir e fechar notificacoes
btnNotificacoes.onclick = function () {
    cardNoticicaoes.classList.toggle("hide")
}



//mostra modal com avenccas ativas
btnAvencasAtivas.addEventListener("click", function () {

    textoAvencasAtivas.textContent = "Avenças ativas"
    divAtivo.style.display = "block"
    iconeAvencas.className = "bx bx-user-check"
    modalAvencasAtivas.showModal()

})

//mostrar modal com avencas expiradas
btnAvencasExpiradas.addEventListener("click", function () {

    textoAvencasAtivas.textContent = "Avenças expiradas"
    divAtivo.style.display = "none"
    iconeAvencas.className = "bx bx-user-x"
    modalAvencasAtivas.showModal()

})


//fechar modal  ao clicar na tela 
document.addEventListener("click", function (evento) {
    if (evento.target === modalAvencasAtivas) {
        modalAvencasAtivas.close()
    }
})



btnUsuario.addEventListener("click", function (evento) {
    modalSair.showModal()
    iconeUsuario.setAttribute("class", "bx bxs-user")
    btnSimSair.addEventListener("click", function () {
        window.location.href = "../main/login-avenças.html"

    })

})
// felchar modal sair
btnNaoSair.addEventListener("click", function (evento) {
    iconeUsuario.setAttribute("class", "bx bx-user")
    modalSair.close()

})

//direcionar ao relatorio ao clicar 
btnRelatorio.onclick = () => {
    window.location.href = "../main/relatorios-avencas.html"
}

btnGerirAvencas.onclick = () => {
    window.location.href = "../main/gerir-avencas.html"
}


//filtrar parques por estado ativo
console.log(clientesComEstado);



const chamarModalComEstados = function () {

    btnsAvencasCard.forEach(btn => {

        btn.addEventListener("click", function (evento) {

            const btnId = evento.target.id


            const filtrarTotalPorEstado = clientesComEstado.filter(({ estado }) => estado === btnId).length

            avencasAtivasTotal.textContent = filtrarTotalPorEstado


            modalTotalPerc.textContent = (filtrarTotalPorEstado / clientesComEstado.length * 100).toFixed() + "%"


            // filtrar parques por estado ativo ou expirado
            const clientesTerrioComEstado = clientesComEstado.filter(({ estado, parque }) => estado === btnId && parque === "Parque Terrio").length
            const clientesCaveComEstado = clientesComEstado.filter(({ estado, parque }) => estado === btnId && parque.trim() === "Parque cave").length
            const clientesCipDomesticoComEstado = clientesComEstado.filter(({ estado, parque }) => estado === btnId && parque.trim() === "Cip domestico").length
            const clientesCipInternacionalComEstado = clientesComEstado.filter(({ estado, parque }) => estado === btnId && parque.trim() === "Cip internacional").length
            const clientesTaxiComEstado = clientesComEstado.filter(({ estado, parque }) => estado === btnId && parque.trim() === "Taxi").length
            const clientesAutocarrosComEstado = clientesComEstado.filter(({ estado, parque }) => estado === btnId && parque.trim() === "Autocarros").length

            // renderizar elementos na tela
            parqueTerrio.textContent = clientesTerrioComEstado
            parqueCave.textContent = clientesCaveComEstado
            parqueCipDomestico.textContent = clientesCipDomesticoComEstado
            parqueCipInternacional.textContent = clientesCipInternacionalComEstado
            parqueTaxi.textContent = clientesTaxiComEstado
            parqueAutocarro.textContent = clientesAutocarrosComEstado

        })
    })

}

chamarModalComEstados()


