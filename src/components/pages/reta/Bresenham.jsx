const Bresenham = (pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, ctx, height, width) => {

    const maxX = Math.round(pontoFinalX + (height / 2))
    const maxY = Math.round(pontoFinalY + (width / 2))

    // validar erro de ultrapassar painel
    if (Math.abs(maxX) >= height || Math.abs(maxY) >= width) {
        console.log("Pontos fora da area do plano cartesiano estabelecido");
    }
    else {

        //calcula a variacao
        const dx = Math.round(Math.abs(pontoFinalX - pontoInicialX));
        const dy = Math.round(Math.abs(pontoFinalY - pontoInicialY));

        if (dx >= dy) {
            algoritmoBresenhamX(Math.round(pontoInicialX), Math.round(pontoInicialY), Math.round(pontoFinalX),
                Math.round(pontoFinalY), dx, dy, ctx, height, width);
        } else {
            algoritmoBresenhamY(Math.round(pontoInicialX), Math.round(pontoInicialY), Math.round(pontoFinalX),
                Math.round(pontoFinalY), dy, dx, ctx, height, width);
        }
    }
}
const algoritmoBresenhamX = (x0, y0, xEnd, yEnd, dx, dy, ctx, height, width) => {

    //captura de dados do painel
    let lagura = (width / 2);
    let altura = (height / 2);

    // algoritmo de Bresenham
    let ds = 2 * dy - dx;
    const incE = 2 * dy;
    const incNE = 2 * dy - dx;
    let x = 0, y = 0;

    if (x0 > xEnd) {

        x = xEnd;
        y = yEnd;
        xEnd = x0;

    } else {
        x = x0;
        y = y0;
    }

    // desenha o primeiro ponto
    ctx.fillRect(x, y, 1, 1);

    while (x < xEnd) {
        x++;
        if (ds < 0) {
            ds += incE;
        } else {
            y++;
            ds += incNE;
        }


        // setPixel (round (x), round (y));
        ctx.fillRect(lagura + x, altura - y, 1, 1);

    }
}

const algoritmoBresenhamY = (x0, y0, xEnd, yEnd, dx, dy, ctx, height, width) => {
  
    //captura de dados do painel
    let lagura = (width / 2);
    let altura = (height / 2);

    // algoritmo de Bresenham
    let ds = 2 * dx - dy;
    const incE = 2 * dx;
    const incNE = 2 * (dx - dy);
    let x = 0, y = 0;

    if (y0 > yEnd) {

        y = yEnd;
        x = xEnd;
        yEnd = y0;

    } else {
        y = y0;
        x = x0;
    }

    // desenha o primeiro ponto
    ctx.fillRect(lagura + x, y, 1, 1);

    while (y < yEnd) {
        y++;
        if (ds < 0) {
            ds += incE;
        } else {
            x++;
            ds += incNE;
        }


        // setPixel (round (x), round (y));
        ctx.fillRect(lagura + x, altura - y, 1, 1);

    }
}

export default Bresenham