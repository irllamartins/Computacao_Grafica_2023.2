import { Tela } from "./Conteiner";

const DesenhaTela = (tamanho: number, xInicial: number, yInicial: number, xFinal: number, yFinal: number, ctx: any) => {

    // Define a largura das linhas
    ctx.lineWidth = 1;

    // Define a cor das linhas
    ctx.strokeStyle = "#b2b2b2";

    // onde começa o ponto do "lapis"
    ctx.beginPath();
    ctx.moveTo(xInicial, yInicial);
    ctx.lineTo(xInicial, yFinal);
    ctx.lineTo(xFinal, yFinal);
    ctx.lineTo(xFinal, yInicial);
    ctx.lineTo(xInicial, yInicial);
    ctx.stroke();
}
export default DesenhaTela 