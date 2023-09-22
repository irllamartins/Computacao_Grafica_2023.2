const DesenharFigura = (tamanho: number, pontos: number[][], cor: string, ctx: any) => {
  console.log(pontos, "|", cor)

  const novo_tamanho = tamanho / 2
  // Define a cor das linhas
  ctx.strokeStyle = cor;

  // Define a largura das linhas
  ctx.lineWidth = 1;
  // onde começa o ponto do "lapis"
  ctx.beginPath()

  for (let i = 0; i < pontos.length - 1; i++) {
    ctx.moveTo(novo_tamanho + pontos[i][0], novo_tamanho - pontos[i][1])
    ctx.lineTo(novo_tamanho + pontos[i + 1][0], novo_tamanho - pontos[i + 1][1])
  }
  // Aplica o traço à linha
  ctx.stroke();
}
export default DesenharFigura