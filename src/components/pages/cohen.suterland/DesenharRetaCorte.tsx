import { Reta } from "../cohen.suterland/Conteiner";

export const DesenharRetaCorte = (tamanhoHeight: number,tamanhoWidth: number, reta: Reta,  ctx: any) => {

  // Define a largura das linhas
  ctx.lineWidth = 2;

    // Define a cor das linhas
    ctx.strokeStyle = reta.cor;
    
    // onde começa o ponto do "lapis"
    ctx.beginPath();
    ctx.moveTo(reta.xInicial, tamanhoWidth - reta.yInicial);
    ctx.lineTo(reta.yInicial, tamanhoWidth - reta.yFinal);
    // Aplica o traço à linha
    ctx.stroke();

};

export default DesenharRetaCorte