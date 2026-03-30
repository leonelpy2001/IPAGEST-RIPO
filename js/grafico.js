const grafico = document.querySelector("#myChart")

//pegar o mes corrente
const hoje = new Date()
const mesAtual = hoje.getMonth() + 1


//gerar meses ate o mes corrente
const gerarMesesCorrente = function (mes) {

    const mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        .slice(0, mes)


    return mesesDoAno
}


//gerar grafico
new Chart(grafico, {
    type: 'line',
    data: {
        labels: gerarMesesCorrente(mesAtual),
        datasets: [{
            label: 'Controlo mensal de avenças',
            data: [12, 8, 16],
            borderWidth: 2.5,
            tension: 0.5,
            borderColor: 'rgb(73, 200, 92)',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }

});