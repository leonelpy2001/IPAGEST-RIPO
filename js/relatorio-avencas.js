//pegar elementos via DOM 
let btnNotificacoes = document.querySelector("#btn-notificacoes")
let btnUsuario = document.querySelector("#btn-usuario")
let btnNaoSair = document.querySelector(".nao-sair")
let btnSimSair = document.querySelector(".sim-sair")
let btnRelatorio = document.querySelector(".div-banner-relatorio button")
let btnGerirAvencas = document.querySelector("#gerir-avenca")
let btnEstados = document.querySelectorAll(".rolo-btns button")
let btnPainel = document.querySelector(".i-rolo")
let btnsParques = document.querySelectorAll(".div-parques button")
let btnExportar = document.querySelector(".btn-exportar")

export { btnEstados, btnsParques }

let estadoAtual = null

let cardAlerta = document.querySelector(".testo-de-escolha")


let modalSair = document.querySelector(".sair-da-conta")
let folha = document.querySelector(".div-folha")

let folhaHeader = document.querySelector(".div-rotolo-h-p h2")
let folhaTotal = document.querySelector(".div-total-span .total")
let folhaParagrafo = document.querySelector(".div-rotolo-h-p p")
let folhaDiretorio = document.querySelector(".div-diretorio-data .diretorio")
let folhaData = document.querySelector(".div-diretorio-data .data")

let folhaTabelaThead = document.querySelector("table thead")
let folhaTabelaTbody = document.querySelector("table tbody")
let folhaTabelaTotal = document.querySelector("table .total")

let cardNoticicaoes = document.querySelector(".notificacoes")
let divParques = document.querySelector(".div-parques")
let iconeUsuario = document.querySelector("#icone-usuario")
let iconePainel = document.querySelector(".i-rolo i")
let usuarioNome = document.querySelector(".usuario-nome")


//pegar dados do banco
let store = JSON.parse(localStorage.getItem("usuarios")) || []
//pegar clientes do banco
let todosClientes = JSON.parse(localStorage.getItem("clientes")) || []


btnGerirAvencas.addEventListener("click", function () {
    window.location.href = "../main/avencas-painel.html"
})

//gerar clientes com estados do banco
let clientesComEstado = todosClientes.map(cliente => {
    let hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const [dia, mes, ano] = cliente.data_fim.split("/")

    const termino = new Date(ano, mes - 1, dia)
    termino.setHours(0, 0, 0, 0)

    const diffMs = hoje - termino

    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const expirado = hoje > termino

    return {
        ...cliente,
        estado: expirado ? "Expirado" : "Ativo",
        dias_atraso: expirado ? diffDias : 0
    }


})





const mostrarNomeDeUsuario = function (usuario) {
    usuarioNome.textContent = usuario
}

mostrarNomeDeUsuario("abelardesneto")

const desaBilitarBtn = function () {
    btnPainel.style.backgroundColor = " rgb(231, 231, 231)"
    btnPainel.style.color = "black"
    btnPainel.style.opacity = "0.7"
    iconePainel.className = "bx bx-grid"
}
desaBilitarBtn()

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

//gerear data atual para relatorios
const gerarData = function () {
    // pegar a data 
    let hoje = new Date()
    //gerar o dia mes e ano
    const data = hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })
    //mostrar os dados 
    return data
}



//  gerar relatorio geral
const geraRelatorioGeral = () => {
    divParques.classList.add("hidden")
    //pegar o total de  todos clientes ativos
    const clientesAtivos = clientesComEstado.filter(({ estado }) => estado === "Ativo").length
    //pegar o total de  todos clientes expirados
    const clientesExpirados = clientesComEstado.filter(({ estado }) => estado === "Expirado").length


    folhaHeader.textContent = "Avenças"
    folhaParagrafo.textContent = "Este documento representa o resumo geral das avenças emitidas ao longo do mês atual. O documento detalha o total de avenças com estado ativo e expirado"
    folhaTotal.textContent = todosClientes.length
    folhaDiretorio.textContent = "Relatorio geral"
    folhaData.textContent = gerarData()

    folhaTabelaThead.innerHTML = `<tr>
                                <th>Descrição</th>

                                <th>Qt.</th>
                                 </tr>
    `

    folhaTabelaTbody.innerHTML = `
                             <tr>
                                <td class="av">Avenças ativas </td>
                                <td>${clientesAtivos}</td>

                            </tr>
                            <tr>
                                <td class="av">Avenças expiradas </td>
                                <td>${clientesExpirados}</td>

                            </tr>
    `

    folhaTabelaTotal.innerHTML = `
                            <td class="av" colspan="2">Total em controlo: ${clientesAtivos + clientesExpirados}</td>
  `

}
geraRelatorioGeral()


const atribuirEstado = (btnEstado) => {

    divParques.classList.remove("hidden")

    estadoAtual = btnEstado

}

const atualizarContagemParques = () => {

    btnsParques.forEach(btn => {

        const filtrarPorEstadoEparques = clientesComEstado.filter(
            ({ estado, parque }) => estado === estadoAtual && parque === btn.value
        )
        // exemplo para mostrar no texto do botão
        btn.textContent = `${btn.value}  ${filtrarPorEstadoEparques.length}`


    })
}

btnsParques.forEach(btn => {

    btn.addEventListener("click", function () {
        btnsParques.forEach(b => b.classList.remove("ativo-btn-parques"))
        btn.classList.add("ativo-btn-parques")

        if (!estadoAtual) return


        btnExportar.disabled = false
        btnExportar.style.opacity = 1
        folha.classList.remove("hidden")
        cardAlerta.classList.add("hidden")

        const filtrarPorEstadoEparques = clientesComEstado.filter(({ estado, parque }) => estado === estadoAtual && parque === btn.value)

        
        folhaHeader.textContent = "Avenças"
        folhaParagrafo.textContent = `O presente relatório tem como objetivo apresentar uma síntese das avenças com estado ${estadoAtual} referentes aos clientes do mês corrente.`
        folhaTotal.textContent = todosClientes.length
        folhaDiretorio.textContent = `Relatorio / Estado ${estadoAtual} / ${btn.value}`
        folhaData.textContent = gerarData()

        folhaTabelaThead.innerHTML = `<tr>
                                <th>Cliente</th>

                                <th>Empresa</th>
                                              
                                <th>Matricula</th>

                                <th>Data de fim</th>
                                 </tr>
    `

        folhaTabelaTbody.innerHTML = filtrarPorEstadoEparques.map(({ nome, empresa, matricula, data_fim }) => `
                             <tr>
                                
                                <td>${nome}</td> 
                                 <td>${empresa}</td> 
                                 <td>${matricula}</td> 
                              <td>${data_fim}</td> 
                            </tr>
                            
    `).join("")

        folhaTabelaTotal.innerHTML = `
                            <td class="av" colspan="4">Total em controlo:  ${filtrarPorEstadoEparques.length} </td>
  `



    })
})



btnEstados.forEach(btn => {

    btn.addEventListener("click", function (evento) {
        btnEstados.forEach(b => b.classList.remove("ativoo"))
        btnsParques.forEach(b => b.classList.remove("ativo-btn-parques"))


        btn.classList.add("ativoo")
        let btnValue = evento.target.value


        if (btnValue === "geral") {
            geraRelatorioGeral()
            btnExportar.disabled = false
            btnExportar.style.opacity = 1
            cardAlerta.classList.add("hidden")
            folha.classList.remove("hidden")

        }

        if (btnValue === "Ativo" || btnValue === "Expirado") {
            folha.classList.add("hidden")
            cardAlerta.classList.remove("hidden")
            btnExportar.disabled = true
            btnExportar.style.opacity = "0.6"
            atribuirEstado(btnValue)
            atualizarContagemParques()

        }





    })
})




