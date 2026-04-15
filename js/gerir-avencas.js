//pegar elementos via DOM
let form = document.querySelector(".form-pesquisar")
let inputPesquisa = document.querySelector(`.form-pesquisar input[type="text"]`)
let lista = document.querySelector("ul.lista")
let contador = document.querySelector(".div-lista-btns-toltal span")
let btnAdicionar = document.querySelector(".div-lista button")
let btnCarregar = document.querySelector("button.carregar")
let btnPainel = document.querySelector(".i-rolo")
let btnGerirAvencas = document.querySelector("#gerir-avenca")
let btnUsuario = document.querySelector("#btn-usuario")
let btnNaoSair = document.querySelector(".nao-sair")
let btnSimSair = document.querySelector(".sim-sair")
let iconeUsuario = document.querySelector("#icone-usuario")
let modalEliminarCliente = document.querySelector(".eliminar-cliente")
let modalSair = document.querySelector(".sair-da-conta")
let modalVerClientes = document.querySelector(".modal-ver-cliente")
let formAdicionar = document.querySelector(".form-adicionar")
let iconePainel = document.querySelector(".i-rolo i")
let controlarContagem = 6
let select = document.querySelector(".lista-estados")

let btnNotificacoes = document.querySelector("#btn-notificacoes")
let cardNoticicaoes = document.querySelector(".notificacoes")
let usuarioNome = document.querySelector(".usuario-nome")

let inputNomeDoCliente = document.querySelector(`input[name="cliente-nome"]`)
let inputImpresaNome = document.querySelector(`input[name="empresa"]`)
let inputMorada = document.querySelector(`input[name="morada"]`)
let inputTelefone = document.querySelector(`input[name="telefone"]`)
let inputEmail = document.querySelector(`input[name="email"]`)
let inputMatricula = document.querySelector(`input[name="matricula"]`)
let inputDataInicio = document.querySelector(`input[name="data-inicio"]`)
let inputDataFim = document.querySelector(`input[name="data-fim"]`)
let formSelect = document.querySelector(`.form-adicionar select`)


let spanInicial = document.querySelector(".modal-ver-cliente .inicial")
let spanNome = document.querySelector(".modal-ver-cliente .nome")
let spanEmpresa = document.querySelector(".user-inform .empresa")
let spanMorada = document.querySelector(".user-inform .morada")
let spanTelefone = document.querySelector(".user-inform .telefone")
let spanMatricula = document.querySelector(".user-inform .matricula")
let spanEMail = document.querySelector(".user-inform .email")
let spanParque = document.querySelector(".user-inform .parque")
let spanDataInicio = document.querySelector(".user-inform .data-incio")
let spanDataFim = document.querySelector(".user-inform .data-fim")
let spanEstado = document.querySelector("  .div-rolo .estado strong")
console.log(spanEstado);

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



// chamar formulario para adicionar clientes 
const chamarFormulario = function () {

    //mostra formulario para adicionar clientes    
    formAdicionar.showModal()

    inputNomeDoCliente.value = ""
    inputImpresaNome.value = ""
    inputMorada.value = ""
    inputTelefone.value = ""
    inputEmail.value = ""
    inputMatricula.value = ""
    inputDataInicio.value = ""
    inputDataFim.value = ""
    formSelect.value = ""


}


//abrir modal sair da conta 
btnUsuario.addEventListener("click", function (evento) {
    let modalSairParagrafo = document.querySelector(".sair-da-conta p")

    modalSairParagrafo.textContent = "Tem serteza que deseja sair da sua conta!"
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


btnAdicionar.addEventListener("click", function (evento) {
    btnAdicionar.style.backgroundColor = "rgb(208, 208, 208)"

    btnAdicionar.style.color = "black"
    chamarFormulario()



})

document.addEventListener("click", function (evento) {

    const elemento = evento.target

    if (elemento === formAdicionar) {

        btnAdicionar.style.backgroundColor = "rgb(27, 27, 27)"

        btnAdicionar.style.color = "rgb(86, 255, 86)"
        formAdicionar.close()
    }
})





//eliminar clientes da lista 
const eliminarClientes = function (btnsEliminar) {
    btnsEliminar.forEach(btn => {
        btn.addEventListener("click", function () {
            let modalSairParagrafo = document.querySelector(".sair-da-conta p")

            modalSairParagrafo.textContent = "Tem serteza que deseja elimina este registo"
            btnSimSair.addEventListener("click", function () {
                window.location.href = ""

            })
            modalSair.showModal()
        })
    })
}

//editar clientes
const editarClientes = function (btnsEditar, clientes) {

    const converterData = function (data) {

        const [dia, mes, ano] = data.split("/")
        return `${ano}-${mes}-${dia}`

    }

    btnsEditar.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            chamarFormulario()
            const cliente = clientes[index]



            inputNomeDoCliente.value = cliente.nome.trim()
            inputImpresaNome.value = cliente.empresa.trim()
            inputMorada.value = cliente.morada.trim()
            inputTelefone.value = cliente.telefone.trim()
            inputEmail.value = cliente.email.trim()
            inputMatricula.value = cliente.matricula.trim()
            inputDataInicio.value = converterData(cliente.data_inicio)
            inputDataFim.value = converterData(cliente.data_fim)
            formSelect.value = cliente.parque

        })


    })
}


const mostrarClientes = function (clientesPorIndex, clientes) {
    modalVerClientes.showModal()

    document.addEventListener("click", function (evento) {

        const elemento = evento.target

        if (elemento === modalVerClientes) {

            modalVerClientes.close()
        }
    })
}


//ver clientes
const verClientes = function (btnsVer, clientes) {
    btnsVer.forEach((btn, index) => {

        let clientesPorIndex = clientes[index]
        btn.addEventListener("click", function () {

            mostrarClientes()


            spanEstado.textContent = clientesPorIndex.estado
            spanInicial.textContent = clientesPorIndex.nome.charAt(0)
            spanNome.textContent = clientesPorIndex.nome
            spanEmpresa.textContent = clientesPorIndex.empresa
            spanMorada.textContent = clientesPorIndex.morada
            spanTelefone.textContent = clientesPorIndex.telefone
            spanMatricula.textContent = clientesPorIndex.matricula
            spanEMail.textContent = clientesPorIndex.email
            spanParque.textContent = clientesPorIndex.parque
            spanDataInicio.textContent = clientesPorIndex.data_inicio
            spanDataFim.textContent = clientesPorIndex.data_fim


        })
    })
}




//marcar clientes com estado expirado
const marcarEstadosEspirados = function (pegarEstado, elemtoEspirado) {
    pegarEstado.forEach((item, index) => {
        if (item.textContent.trim() === "Expirado") {
            elemtoEspirado[index].style.border = "2px solid rgba(248, 133, 133, 0.67)"
            elemtoEspirado[index].style.backgroundColor = "transparent"
        }
    })
}

console.log(clientesComEstado);

//mostrar lista de clientes 
const mostraTodosClientes = function (clientes) {

    //em caso de nenhum cliente for encontrado
    if (clientes.length <= 0) {
        lista.innerHTML = `<p class="texto-oculto">Cliente nao Encontrado</p>`
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
    lista.innerHTML = minimoDeClientes.map(({ id, nome, estado, data_inicio, data_fim, matricula }) => `
      <li class="itens">
                            <div class="rolo-informacao-usuario">
                                <span>${nome.charAt(0)} </span>
                                <div class="div-nome-estado">
                                    <p class="nome"><strong> ${nome} </strong></p>
                                    <p class="estado">Estado: <strong class="str-estado"> ${estado} </strong></p>
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
                                <i class="bx bx-trash" id="eliminar" data-id="${id}"></i>
                                <i class="bx bx-edit" id="editar" data-id="${id}"></i>
                                <img src="../asets/imgs/outros/arrow-up-right.svg" alt="" id="ver">
                            </div>



                        </li>
    
    ` ).join("")


    //pegar elementos rederizados via Dom
    const pegarEstado = document.querySelectorAll(".str-estado")
    const elemtoEspirado = document.querySelectorAll(".lista li")

    const btnsEliminar = document.querySelectorAll(".div-acoes #eliminar")
    const btnsEditar = document.querySelectorAll(".div-acoes #editar")
    const btnsVer = document.querySelectorAll(".div-acoes #ver")




    // funcao eliminar clientes
    eliminarClientes(btnsEliminar)

    // funcao editar clientes 
    editarClientes(btnsEditar, clientes)

    // funcao ver cliente
    verClientes(btnsVer, clientes)

    //funcao  marcar estados expirados
    marcarEstadosEspirados(pegarEstado, elemtoEspirado)



    // atualizar o contador para a contagem de totais atuas
    contador.textContent = `Total de ${clientes.length} contratos`

    //carregar mais itens ao carregar o btn
    btnCarregar.onclick = function () {

        const clientesCarregados = clientes.slice(0, controlarContagem *= 2)

        //remover btnCarregar se a consulta chegou ao fim...
        if (clientesCarregados.length === clientes.length) {
            controlarContagem = 6
            btnCarregar.classList.add("hidden")
        }



        lista.innerHTML = clientesCarregados.map(({ nome, estado, data_inicio, data_fim, matricula }) => `
          <li class="itens">
                            <div class="rolo-informacao-usuario">
                                <span>${nome.charAt(0)} </span>
                                <div class="div-nome-estado">
                                    <p class="nome"><strong> ${nome} </strong></p>
                                    <p class="estado">Estado: <strong class="str-estado"> ${estado} </strong></p>
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
                                <i class="bx bx-trash" id="eliminar"></i>
                                <i class="bx bx-edit" id="editar"></i>
                                <img src="../asets/imgs/outros/arrow-up-right.svg" alt="" id="ver">
                            </div>



                        </li>
    
         ` ).join("")



        //pegar elementos rederizados via Dom
        const pegarEstado = document.querySelectorAll(".str-estado")
        const elemtoEspirado = document.querySelectorAll(".lista li")

        const btnsEliminar = document.querySelectorAll(".div-acoes #eliminar")
        const btnsEditar = document.querySelectorAll(".div-acoes #editar")
        const btnsVer = document.querySelectorAll(".div-acoes #ver")




        // funcao eliminar clientes
        eliminarClientes(btnsEliminar)

        // funcao editar clientes 
        editarClientes(btnsEditar, clientes)

        // funcao ver cliente
        verClientes(btnsVer, clientes)

        //funcao  marcar estados expirados
        marcarEstadosEspirados(pegarEstado, elemtoEspirado)

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