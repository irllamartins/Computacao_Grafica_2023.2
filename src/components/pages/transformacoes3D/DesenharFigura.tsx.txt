const DesenharFigura = (tamanho: number, pontos: number[][], cor: string, ctx: any) => {

  const novo_tamanho = tamanho / 2
  // Define a cor das linhas
  ctx.strokeStyle = cor;

  // Define a largura das linhas
  ctx.lineWidth = 1;
  // onde começa o ponto do "lapis"
  ctx.beginPath()
  console.log(" total pontos",pontos)
  for (let i = 0; i < pontos.length - 1; i++) {
    console.log("pontos",novo_tamanho + pontos[i][0],"|",novo_tamanho - pontos[i][1])
    console.log("pontos",novo_tamanho + pontos[i+1][0],"|",novo_tamanho - pontos[i+1][1])
    let x;
    let y;
    let z=(novo_tamanho);
    ctx.moveTo(novo_tamanho + pontos[i][0], novo_tamanho - pontos[i][1])
    ctx.lineTo(novo_tamanho + pontos[i + 1][0], novo_tamanho - pontos[i + 1][1])
  }
  // Aplica o traço à linha
  ctx.stroke();
}
export default DesenharFigura