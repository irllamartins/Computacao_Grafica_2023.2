/*const Bresenham = (pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, ctx, height, width) => {

    const maxX = Math.round(pontoFinalX + (height / 2))
    const maxY = Math.round(pontoFinalY + (width / 2))
    let aux

    // validar erro de ultrapassar painel
    if (Math.abs(maxX) >= height || Math.abs(maxY) >= width) {
        console.log("Pontos fora da area do plano cartesiano estabelecido");
    }
    else {

        //captura de dados do painel
        let lagura = (width / 2);
        let altura = (height / 2);

        //calcula a variacao
        const dx = Math.round(Math.abs(pontoFinalX - pontoInicialX));
        const dy = Math.round(Math.abs(pontoFinalY - pontoInicialY));

        // calculo para desenha linha de inclinação de 45°
        if (dx === 0) {
            if (pontoFinalY < pontoInicialY) {
                aux = pontoInicialY
                pontoInicialY = pontoFinalY
                pontoFinalY = aux
            }

            // setPixel
            for (let i = pontoInicialY; i <= pontoFinalY; i++) {
                ctx.fillRect(lagura + pontoInicialX, altura - i, 1, 1);
            }
        }
        else {
            // inclinação da reta(m)
            let inclinacao = parseFloat(dy) / dx

            let ajuste = inclinacao >= 0 ? 1 : -1
            let deslocamento = 0
            let arredondamento = 0.5


            if (inclinacao <= 1 && inclinacao >= -1) {
                let delta = Math.abs(inclinacao)

                // quem vai ser incrementado
                let incY = pontoInicialY
                if (pontoFinalX < pontoInicialX) {
                    aux = pontoInicialX
                    pontoInicialX = pontoFinalX
                    pontoFinalX = aux

                    incY = pontoFinalY
                }

                // setPixel
                for (let i = pontoInicialX; i <= pontoFinalX; i++) {
                    ctx.fillRect(lagura + i, altura - y, 1, 1);
                    deslocamento += delta
                    if (deslocamento >= arredondamento) {
                        incY += ajuste
                        deslocamento += 1
                    }
                }
            }
            else {
                inclinacao = parseFloat(dx) / dy
                let incX = pontoInicialX
                if (pontoFinalY < pontoInicialY) {
                    aux = pontoInicialY
                    pontoInicialY = pontoFinalY
                    pontoFinalY = aux

                    incX = pontoFinalY
                }
                // setPixel
                for (let i = pontoInicialY; i <= pontoFinalY; i++) {
                    ctx.fillRect(lagura + incX, altura - i, 1, 1);
                    deslocamento += delta
                    if (deslocamento >= arredondamento) {
                        incX += ajuste
                        deslocamento += 1
                    }
                }
            }
        }
    }
}*/
const Bresenham = (pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, ctx, height, width) => {

    const maxX = Math.round(pontoFinalX + (height / 2))
    const maxY = Math.round(pontoFinalY + (width / 2))
    let x0, y0, x1, y1

    // validar erro de ultrapassar painel
    if (Math.abs(maxX) >= height || Math.abs(maxY) >= width) {
        console.log("Pontos fora da area do plano cartesiano estabelecido");
    }
    else if((pontoInicialX|| pontoInicialY|| pontoFinalX || pontoFinalY) ===undefined){
        console.log("Contem valores inexistente ");
    }
    else {
        console.log("Bresenham: x [",pontoInicialX,",", pontoInicialY,"] y[", pontoFinalX,",", pontoFinalY,"]")

        //captura de dados do painel
        let lagura = (width / 2);
        let altura = (height / 2);
        ctx.fillRect(lagura + pontoInicialX, altura - pontoInicialY, 1, 1);

        //calcula a variacao
        const dx = Math.round(Math.abs(pontoFinalX - pontoInicialX));
        const dy = Math.round(Math.abs(pontoFinalY - pontoInicialY));
        let inclinacao = parseFloat(dy) / dx

        // x1<x2

        // Octante 1
        //1>=m>=0
    
        if (1 >= inclinacao && inclinacao >= 0 && dx > 0 && dy > 0) {
            x0 = pontoInicialX
            y0 = pontoInicialY
            x1 = pontoFinalX
            y1 = pontoFinalY
        }
        // Octante 8
        // 0>m>=-1
        else if (0 > inclinacao && inclinacao >= -1 && dx > 0 && dy < 0) {
            x0 = pontoInicialX
            y0 = pontoInicialY * (-1)
            x1 = pontoFinalX
            y1 = pontoFinalY * (-1)

        }
        // x2<x1

        // Octante 5
        //1>=m>=0
        else if (1 >= inclinacao && inclinacao >= 0 && dx < 0 && dy < 0) {
            x0 = pontoInicialX * (-1)
            y0 = pontoInicialY * (-1)
            x1 = pontoFinalX * (-1)
            y1 = pontoFinalY * (-1)
        }
        // Octante 4
        // 0>m>=-1
        else if (0 >= inclinacao && inclinacao >= -1 && dx < 0 && dy > 0) {
            x0 = pontoInicialX * (-1)
            y0 = pontoInicialY
            x1 = pontoFinalX * (-1)
            y1 = pontoFinalY
        }

        // y2>y1

        // Octante 2
        //1>=m>=0
        else if (1 >= inclinacao && inclinacao >= 0 && dx < 0 && dy < 0 ) {
            y0 = pontoInicialX
            x0 = pontoInicialY
            y1 = pontoFinalX
            x1 = pontoFinalY
        }
        // Octante 3
        // 0>m>=-1
        else if (0 > inclinacao && inclinacao >= -1 && dx < 0 && dy > 0) {
            y0 = pontoInicialX * (-1)
            x0 = pontoInicialY
            y1 = pontoFinalX * (-1)
            x1 = pontoFinalY
        }

        // Octante 7
        //1>=m>=0
        else if (1 >= inclinacao && inclinacao >= 0 && dx > 0 && dy < 0) {
            y0 = pontoInicialX
            x0 = pontoInicialY * (-1)
            y1 = pontoFinalX
            x1 = pontoFinalY * (-1)

        }
        // Octante 6
        // 0>m>=-1
        else if (1 >= inclinacao && inclinacao >= 0 && dx < 0 && dy < 0) {
            y0 = pontoInicialX * (-1)
            x0 = pontoInicialY * (-1)
            y1 = pontoFinalX * (-1)
            x1 = pontoFinalY * (-1)

        }

        // tendendo ao infinito
      
       // console.log(typeof x0, typeof y0, typeof x1, typeof y1)
       console.log("algoritmo: x [",x0,",", y0,"] y[", x1,",",  y1,"]")
        algoritmoBresenhamX(x0, y0, x1, y1, Math.abs(x1 - x0), Math.abs(y1 - y0), ctx, height, width);
    }
}
const algoritmoBresenhamX = (x0, y0, xEnd, yEnd, dx, dy, ctx, height, width) => {

    console.log("algoritmoBresenhamX: x [",x0,",", y0,"] y[", xEnd,",",  yEnd,"]")


    //captura de dados do painel
    let lagura = (width / 2);
    let altura = (height / 2);

    // algoritmo de Bresenham
    let ds = (2 * dy) - dx;
    const incE = 2 * dy;
    const incNE = 2 * (dy - dx);
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
    console.log("ponto [", x, ",", y, "] ")

    while (x < xEnd) {
        x++;
        if (ds <= 0) {
            ds += incE;
        } else {
            y++;
            ds += incNE;
        }


        // setPixel (round (x), round (y));
        ctx.fillRect(lagura + x, altura - y, 1, 1);
        console.log("ponto [", x, ",", y, "] = ", ds)

    }
}

/*const algoritmoBresenhamY = (x0, y0, xEnd, yEnd, dx, dy, ctx, height, width) => {
  
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
}*/

export default Bresenham