//pegar elementos via DOM 
let btnExportar = document.querySelector(".btn-exportar")

import { btnEstados, btnsParques } from "./relatorio-avencas.js";

const estado = [...btnEstados]
const parques = [...btnsParques]

const hoje = new Date()

let data = hoje.toLocaleDateString()


btnExportar.addEventListener("click", async () => {
    btnExportar.textContent = "Exportando..."
    btnExportar.style.opacity = "0.6"





    const valorDoEstado = estado.find(btn => btn.classList.contains("ativoo"));
    const valorDoParque = parques.find(btn => btn.classList.contains("ativo-btn-parques"));

    const nomeEstado = valorDoEstado?.textContent?.trim() || "Estado";
    const nomeParque = valorDoParque?.textContent?.trim() || "";

    const folha = document.querySelector(".folha");

    const canvas = await html2canvas(folha, {
        scale: 4,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let alturaRestante = imgHeight;
    let posicao = 5;

    pdf.addImage(imgData, "PNG", 0, posicao, imgWidth, imgHeight);
    alturaRestante -= pageHeight;

    while (alturaRestante > 0) {
        posicao = alturaRestante - imgHeight;

        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, posicao, imgWidth, imgHeight);

        alturaRestante -= pageHeight;
    }

    const dataFormatada = data.replaceAll("/", "-");

    pdf.save(`Relatorio ${nomeEstado} ${nomeParque} ${dataFormatada}`);
    setTimeout(() => {

        setTimeout(() => {
            btnExportar.textContent = "Exportar"
            btnExportar.style.opacity = 1
        }, 3000)
        btnExportar.textContent = "Pronto!"

    }, 2000)
});