//pegar elementos via DOM
let form = document.querySelector("form")
let inputPesquisa = document.querySelector(`input[type="text"]`)
let lista = document.querySelector("ul.lista")
let contador = document.querySelector(".div-lista-btns-toltal span")
let btnCarregar = document.querySelector("button.carregar")
let btnPainel = document.querySelector(".i-rolo")
let btnUsuario = document.querySelector("#btn-usuario")
let btnNaoSair = document.querySelector(".nao-sair")
let btnSimSair = document.querySelector(".sim-sair")
let iconeUsuario = document.querySelector("#icone-usuario")
let modalSair = document.querySelector(".sair-da-conta")

let iconePainel = document.querySelector(".i-rolo i")
let controlarContagem = 6
let select = document.querySelector("select")

let btnNotificacoes = document.querySelector("#btn-notificacoes")
let cardNoticicaoes = document.querySelector(".notificacoes")
let usuarioNome = document.querySelector(".usuario-nome")

import { clientesComEstado } from "./dataset.js"








//mostrar nome de usuario
const mostrarNomeDeUsuario = function (usuario) {
    usuarioNome.textContent = usuario
}

mostrarNomeDeUsuario("abelardesneto")

//ir para pagina painel avencas
btnPainel.addEventListener("click", function () {
    window.location.href = "../main/avencas-painel.html"
})



const desaBilitarBtn = function () {

    iconePainel.className = "bx bx-grid"

}
desaBilitarBtn()


//abrir e fechar notificacoes
btnNotificacoes.onclick = function () {

    cardNoticicaoes.classList.toggle("hide")
}


//abrir e fechar notificacoes
btnNotificacoes.onclick = function () {

    cardNoticicaoes.classList.toggle("hide")
}




//abrir modal sair da conta 
btnUsuario.addEventListener("click", function (evento) {
    modalSair.showModal()
    iconeUsuario.setAttribute("class", "bx bxs-user")
    btnSimSair.addEventListener("click", function () {
        window.location.href = "../main/login-avenças.html"

    })

})
// felchar modal sair da conta
btnNaoSair.addEventListener("click", function (evento) {
    iconeUsuario.setAttribute("class", "bx bx-user")
    modalSair.close()

})












//mostrar lista de clientes 
const mostraTodosClientes = function (clientes) {

    //em caso de nenhum cliente for encontrado
    if (clientes.length <= 0) {
        lista.innerHTML = `<li class="texto-oculto">Cliente nao Encontrado</li>`
        contador.textContent = "Total de 0 contratos"
        btnCarregar.classList.add("hidden")
        return
    }



    // ordenar os nomes de forma alfabetica 
    clientes.sort((a, b) => {
        if (a.nome < b.nome) {
            return -1
        }

        if (a.nome > b.nome) {
            return 1
        }
        return 0
    })




    //mostrar btnCarregar
    btnCarregar.classList.remove("hidden")

    //carregar um minimo de 6 clientes por consulta
    const minimoDeClientes = clientes.map((clientes => clientes)).slice(0, 6)


    //em caso do resultado da consulta for menor que 6 itens  remove o btnCarregar
    if (minimoDeClientes.length < 6) {
        btnCarregar.classList.add("hidden")
    }
    //mostrar o resultado da  consulta de ate o minimo de 6 itens
    lista.innerHTML = minimoDeClientes.map(({ nome, estado, data_inicio, data_fim, matricula }) => `
      <li class="itens">
                            <div class="rolo-informacao-usuario">
                                <span>${nome.charAt(0)} </span>
                                <div class="div-nome-estado">
                                    <p class="nome"><strong> ${nome} </strong></p>
                                    <p class="estado">Estado: <strong> ${estado} </strong></p>
                                </div>
                            </div>


                            <div class="datas-incio-fim">
                                <p class="inicio"><strong>Inicio : ${data_inicio}
                                    </strong></p>
                                <p class="fim">Data do fim ${data_fim}
                                </p>
                            </div>

                            <p class="matriculo"> ${matricula}
                            </p>


                            <div class="div-acoes">
                                <i class="bx bx-trash"></i>
                                <i class="bx bx-edit"></i>
                                <img src="../asets/imgs/outros/arrow-up-right.svg" alt="">
                            </div>



                        </li>
    
    ` ).join("")


    // atualizar o contador para a contagem de totais atuas
    contador.textContent = `Total de ${clientes.length} contratos`

    //carregar mais itens ao carregar o btn
    btnCarregar.onclick = function () {

        const clientesCarregados = clientes.map(todosClientes => todosClientes).slice(0, controlarContagem *= 2)

        //remover btnCarregar se a consulta chegou ao fim...
        if (clientesCarregados.length === clientes.length) {

            btnCarregar.classList.add("hidden")
        }



        lista.innerHTML = clientesCarregados.map(({ nome, estado, data_inicio, data_fim, matricula }) => `
          <li class="itens">
                            <div class="rolo-informacao-usuario">
                                <span>${nome.charAt(0)} </span>
                                <div class="div-nome-estado">
                                    <p class="nome"><strong> ${nome} </strong></p>
                                    <p class="estado">Estado: <strong> ${estado} </strong></p>
                                </div>
                            </div>


                            <div class="datas-incio-fim">
                                <p class="inicio"><strong>Inicio : ${data_inicio}
                                    </strong></p>
                                <p class="fim">Data do fim ${data_fim}
                                </p>
                            </div>

                            <p class="matriculo"> ${matricula}
                            </p>


                            <div class="div-acoes">
                                <i class="bx bx-trash"></i>
                                <i class="bx bx-edit"></i>
                                <img src="../asets/imgs/outros/arrow-up-right.svg" alt="">
                            </div>



                        </li>
    
         ` ).join("")




    }

}

//renderizar ao carregar a paguina
mostraTodosClientes(clientesComEstado)

// evitrar envio de formulario
form.addEventListener("submit", function (evento) {

    evento.preventDefault()



})

//filtrar Por pesquisa
form.addEventListener("input", function () {


    let pesquisa = inputPesquisa.value.trim()

    const filtrarPorPesquisa = clientesComEstado.filter(({ nome, matricula }) => nome.includes(pesquisa) || matricula.includes(pesquisa))
    //renderizar filtrando por pesquisa
    mostraTodosClientes(filtrarPorPesquisa)


})

//filtrar por estado
select.addEventListener("click", function (evento) {

    const escolha = evento.target.value;

    const filtrarPorEstado = clientesComEstado.filter(({ estado }) => estado === escolha)

    //renderizar filtrando por estado ativo ou expirado
    mostraTodosClientes(filtrarPorEstado)


    if (escolha === "tudo") {

        mostraTodosClientes(clientesComEstado)

    }

})