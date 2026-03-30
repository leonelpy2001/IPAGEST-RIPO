//Pegar elementos via DOM
let btnAtividades = document.querySelector(".atividades")
let modal = document.querySelector("dialog")

console.log(btnAtividades);


//chamar modal ao clicar 
btnAtividades.addEventListener("click", () => {
    btnAtividades.style.border = "2px solid black"

    modal.showModal()
})

modal.addEventListener("click", (evento) => {
    console.log(evento.target === modal);
    btnAtividades.style.border = "2px solid transparent"

    if (evento.target === modal) {
        modal.close()
    }
})