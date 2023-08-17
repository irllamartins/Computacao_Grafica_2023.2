

const DesenharLimite = (ctx,canvas) => { 
    // Define a cor das linhas
  ctx.strokeStyle = '#f04201';

    // Define a largura das linhas
    ctx.lineWidth = 1;

    // Desenha o eixo x
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Desenha o eixo y
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

}
export default DesenharLimite