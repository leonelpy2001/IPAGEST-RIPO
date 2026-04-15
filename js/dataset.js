


let usuariosAvencas = [

    {
        id: Date.now(),
        nome: "Abelardesneto",
        email: "abelardesneto11@gmail.com",
        senha: "123456"
    }
    ,
    {
        id: Date.now(),
        nome: "Antoniopedro",
        email: "antonio125@gmail.com",
        senha: "123456"
    }


]



import data from "../clientes.json" with{type: "json"}


let clientes = data.clientes


localStorage.setItem("clientes", JSON.stringify(clientes))
localStorage.setItem("usuarios", JSON.stringify(usuariosAvencas))



let todosClientes = JSON.parse(localStorage.getItem("clientes")) || []
let menbrosAvencas = JSON.parse(localStorage.getItem("usuarios")) || []

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

export { clientesComEstado }
export { menbrosAvencas }


