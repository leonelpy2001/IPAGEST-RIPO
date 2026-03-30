//pegar elentos via DOM
let nomeInput = document.querySelector("#nome")
let senhaInput = document.querySelector("#senha")
let form = document.querySelector("form")
// pegar alertas 
let alertaNome = document.querySelector(".alerta-nome")
let alertaSenha = document.querySelector(".alerta-senha")




//pegar dados do banco
let store = JSON.parse(localStorage.getItem("usuarios")) || []
let todosUSER = JSON.parse(localStorage.getItem("usuarios")) || []



//validacao do formulario
form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    //pegar os valores dos elemetos
    let nomeValor = nomeInput.value.trim()
    let senhaValor = senhaInput.value.trim()
    //limpar campos 
    alertaNome.textContent = ""
    alertaSenha.textContent = ""
    // pegar nome e senha de teste
    const nomeSalvo = store.nome
    const senhaSalva = store.senha



    // se o valor do campo nome for vazio 
    if (!nomeValor) {
        alertaNome.textContent = " Este campo esta vazio"
        return
    }

    // se o nome nao correspoder ao dados do banco
    if (!todosUSER.find(({ nome }) => nome === nomeValor)) {
        alertaNome.textContent = " Este nome nao existe"
        return
    }

    // se o valor do campo senha for vazio 
    if (!senhaValor) {
        alertaSenha.textContent = " Este campo esta vazio"
        return
    }

    // se a senha nao correspoder ao dados do banco
    if (!todosUSER.find(({ senha }) => senha === senhaValor)) {
        alertaSenha.textContent = " Senha incorreta"
        return
    }

    window.location.href = "../main/avencas-painel.html"


})
