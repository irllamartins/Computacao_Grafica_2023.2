import { Reta } from "../pages/cohen.suterland/Conteiner";

export const DesenharReta = (tamanho: number, retas: Reta[],  ctx: any) => {

  // Define a largura das linhas
  ctx.lineWidth = 2;

  retas.forEach((reta) => {
    // Define a cor das linhas
    ctx.strokeStyle = reta.cor;
    
    // onde começa o ponto do "lapis"
    ctx.beginPath();
    ctx.moveTo(reta.xInicial, tamanho - reta.yInicial);
    ctx.lineTo(reta.yInicial, tamanho - reta.yFinal);
    // Aplica o traço à linha
    ctx.stroke();
  });
};

export default DesenharReta