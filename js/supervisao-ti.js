//pegar elementos via DOM

let lista = document.querySelector("ul.lista")
let contador = document.querySelector(".div-lista-btns-toltal span")
let btnAdicionar = document.querySelector(".div-lista button")

let btnUsuario = document.querySelector("#btn-usuario")
let btnNaoSair = document.querySelector(".nao-sair")
let btnSimSair = document.querySelector(".sim-sair")
let iconeUsuario = document.querySelector("#icone-usuario")

let modalSair = document.querySelector(".sair-da-conta")
let formAdicionar = document.querySelector(".form-adicionar")

let btnNotificacoes = document.querySelector("#btn-notificacoes")
let cardNoticicaoes = document.querySelector(".notificacoes")
let usuarioNome = document.querySelector(".usuario-nome")

let modalAvencas = document.querySelector(".modal-cadastro-menbros-avencas")
let tituloformAvenca = document.querySelector(".modal-cadastro-menbros-avencas h2")


let inputNome = document.querySelector("#user-nome-completo")
let inputEmail = document.querySelector("#user-email")

import { menbrosAvencas } from "./dataset.js"





//mostrar nome de usuario
const mostrarNomeDeUsuario = function (usuario) {
    usuarioNome.textContent = usuario
}

mostrarNomeDeUsuario("antoniopedro")

//abrir e fechar notificacoes
btnNotificacoes.onclick = function () {

    cardNoticicaoes.classList.toggle("hide")
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

const chamarFormulario = function () {

    //mostra formulario para adicionar clientes    
    modalAvencas.showModal()
    inputNome.value = ""

    inputEmail.value = ""
    tituloformAvenca.textContent = "Adicionar menbro"

    document.addEventListener("click", function (evento) {

        const elemento = evento.target




        if (elemento === modalAvencas) {
            modalAvencas.close()

            btnAdicionar.style.backgroundColor = "rgb(27, 27, 27)"

            btnAdicionar.style.color = "rgb(86, 255, 86)"

        }
    })

}

btnAdicionar.addEventListener("click", function (evento) {
    btnAdicionar.style.backgroundColor = "rgb(208, 208, 208)"

    btnAdicionar.style.color = "black"
    chamarFormulario()



})





//eliminar clientes da lista 
const eliminarClientes = function (btnsEliminar) {
    btnsEliminar.forEach(btn => {
        btn.addEventListener("click", function () {
            let modalSairParagrafo = document.querySelector(".sair-da-conta p")

            modalSairParagrafo.textContent = "Tem serteza que deseja elimina este usuario"
            btnSimSair.addEventListener("click", function () {
                window.location.href = ""

            })
            modalSair.showModal()
        })
    })
}


//editar clientes
const editarClientes = function (btnsEditar, usuarioAvenca) {



    btnsEditar.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            chamarFormulario()
            const usuarioAv = usuarioAvenca[index]

            tituloformAvenca.textContent = "Editar Membro"
            inputNome.value = usuarioAv.nome

            inputEmail.value = usuarioAv.email



        })


    })
}



const adicionarMenbrosAvencas = function (usuariosAvenca) {

    //em caso de nenhum cliente for encontrado
    if (usuariosAvenca.length <= 0) {
        lista.innerHTML = `<p class="texto-oculto">Cliente nao Encontrado</p>`
        contador.textContent = "Total de 0 usuarios"
        btnCarregar.classList.add("hidden")
        return
    }


    // ordenar os nomes de forma alfabetica 
    usuariosAvenca.sort((a, b) => {
        if (a.nome < b.nome) {
            return -1
        }

        if (a.nome > b.nome) {
            return 1
        }
        return 0
    })


    //carregar um minimo de 6 clientes por consulta
    const minimoDeClientes = usuariosAvenca.map((usuarios => usuarios)).slice(0, 6)





    //mostrar o resultado da  consulta de ate o minimo de 6 itens
    lista.innerHTML = minimoDeClientes.map(({ id, nome, email }) => `
      <li class="itens">
                            <div class="rolo-informacao-usuario">
                                <span>${nome.charAt(0)} </span>
                                <div class="div-nome-estado">
                                    <p class="nome"><strong> ${nome} </strong></p>
                                  
                                </div>
                            </div>


                            

                            <p class="email"> ${email}
                            </p>


                            <div class="div-acoes">
                                <i class="bx bx-trash" id="eliminar" data-id="${id}"></i>
                                <i class="bx bx-edit" id="editar" data-id="${id}"></i>
                               
                            </div>



                        </li>
    
    ` ).join("")


    const btnsEliminar = document.querySelectorAll(".div-acoes #eliminar")
    const btnsEditar = document.querySelectorAll(".div-acoes #editar")


    // funcao eliminar clientes
    eliminarClientes(btnsEliminar)


    // funcao editar clientes 
    editarClientes(btnsEditar, usuariosAvenca)






    // atualizar o contador para a contagem de totais atuas
    contador.textContent = `Total de ${usuariosAvenca.length} usuarios`
}

adicionarMenbrosAvencas(menbrosAvencas)