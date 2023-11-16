

const DesenharLimite = (ctx, canvas) => {
  // Define a cor das linhas
  ctx.strokeStyle = 0xeeeeee

  // Define a largura das linhas
  ctx.lineWidth = 0.5;

  // Desenha o eixo x (linha horizontal)
  ctx.strokeStyle = '#e60000'
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width / 2, canvas.width / 2);
  ctx.stroke();

  // Desenha o eixo y (linha vertical)
  ctx.strokeStyle = '#007acc'
  ctx.beginPath();
  ctx.moveTo(canvas.height, canvas.height);
  ctx.lineTo(canvas.width / 2, canvas.width / 2);
  ctx.stroke();

  // Desenha o eixo z (linha vertical)
  ctx.strokeStyle =	'#33cc33'
  ctx.beginPath();
  ctx.moveTo(canvas.height/2, 0);
  ctx.lineTo(canvas.width / 2, canvas.width / 2);
  ctx.stroke();

}
export default DesenharLimite