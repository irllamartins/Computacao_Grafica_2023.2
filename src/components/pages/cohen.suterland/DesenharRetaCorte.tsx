import { Reta } from "../cohen.suterland/Conteiner";

export const DesenharRetaCorte = (tamanho: number, reta: Reta,  ctx: any) => {

  // Define a largura das linhas
  ctx.lineWidth = 2;

    // Define a cor das linhas
    ctx.strokeStyle = reta.cor;
    
    // onde começa o ponto do "lapis"
    ctx.beginPath();
    ctx.moveTo(reta.xInicial,reta.yInicial);
    ctx.lineTo(reta.xFinal, reta.yFinal);
    // Aplica o traço à linha
    ctx.stroke();

};

export default DesenharRetaCorte