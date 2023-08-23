

const DesenharLimite = (ctx,canvas) => { 
  // Define a cor das linhas
ctx.strokeStyle = "#b2b2b2";

  // Define a largura das linhas
  ctx.lineWidth = 0.5;

  // Desenha o eixo x (linha horizontal)
  ctx.beginPath();
  ctx.moveTo(0,canvas.width/2);
  ctx.lineTo(canvas.width,canvas.width/2);
  ctx.stroke();

  // Desenha o eixo y (linha vertical)
  ctx.beginPath();
  ctx.moveTo(canvas.height/2, 0);
  ctx.lineTo(canvas.height/2,canvas.height);
  ctx.stroke();

}
export default DesenharLimite