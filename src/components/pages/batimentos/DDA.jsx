
// cria reta com laço loop DDA: Digital Differential Analyzer (Método do Declive)
export const DDA = (pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, ctx, height, width) => {

    // validar erro de ultrapassar painel
    const maxX = Math.round(pontoFinalX);
    const maxY = Math.round(pontoFinalY);

    /* tratamento de fora do limites
    if (Math.abs(maxX) >= height || Math.abs(maxY) >= width) {
        console.log("Pontos fora da area do plano cartesiano estabelecido");
    }
    else {*/

        //calcula variacao
        const dx = Math.round(Math.abs(pontoFinalX - pontoInicialX));
        const dy = Math.round(Math.abs(pontoFinalY - pontoInicialY));

        //convete dados do Ponto para inteiro
        const x0 = Math.round(pontoInicialX);
        const y0 = Math.round(pontoInicialY);
        const x = Math.round(pontoFinalX);
        const y = Math.round(pontoFinalY);

        //define a maior variacao onde a primeira do argumento da dda vai ser maior
        if (dx >= dy) {
            dda(x0, y0, x, y, dx, ctx, height, width);
        } else {
            dda(x0, y0, x, y, dy, ctx, height, width);
        }
   // }
}

const dda = (x0, y0, xEnd, yEnd, steps, ctx, height, width) => {
    let k
    let xIncrement, yIncrement, x = x0, y = y0;

    //captura de dados do painel
  

    // decide o valor do incremento
    xIncrement = (xEnd - x0) / steps;
    yIncrement = (yEnd - y0) / steps;

    // setPixel (round (x), round (y));
    ctx.fillRect(Math.round( Math.round(x)), Math.round( Math.round(y)), 1, 1);

    //incrementa de acordo com a normalizacao da reta
    for (k = 0; k < steps; k++) {

        x += xIncrement;
        y += yIncrement;

        // setPixel (round (x), round (y));
        ctx.fillRect(Math.round( Math.round(x)), Math.round(Math.round(y)), 1, 1);

    }

}

export default DDA 