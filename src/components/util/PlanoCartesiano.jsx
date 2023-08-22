

const DesenharLimite = (ctx,canvas) => { 
    // Define a cor das linhas
  ctx.strokeStyle = "#b2b2b2";

    let pontoX=-450
    let pontoY=-250
    // Define a largura das linhas
    ctx.lineWidth = 0.5;

    // Desenha o eixo x (linha horizontal)
    ctx.beginPath();
    ctx.moveTo(0,canvas.width+(pontoX));
    ctx.lineTo(canvas.width,canvas.width+(pontoX));
    ctx.stroke();

    // Desenha o eixo y (linha vertical)
    ctx.beginPath();
    ctx.moveTo(canvas.height+(pontoY), 0);
    ctx.lineTo(canvas.height +(pontoY),canvas.height);
    ctx.stroke();

}
export default DesenharLimite