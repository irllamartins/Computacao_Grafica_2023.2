// calcula o ponto medio pelo algoritmo de bresenham
const PontoMedio = ( altura,largura, raio,ctx ) => {

    let x = 0;
    let y = raio;
    let d = 1 - raio;

    simetria(altura,largura,x,y,ctx)
    while (y > x) {
        if (d < 0) {
            // escolhe o E
            d += 2.0 * x + 3.0;
        } else {
            // escolhe SE
            d += 2.0 * (x - y) + 5;
            y--;
        }
        x++;
        simetria(altura,largura,x,y,ctx)
    }
}

const simetria =(altura,largura,x,y,ctx)=>{
   
     // segundo octante
     ctx.fillRect(largura + x, altura - y, 1, 1);

     // oitavo octante
     ctx.fillRect(largura + y, altura + x, 1, 1);

     // primeiro octante
     ctx.fillRect(largura + y, altura - x, 1, 1);

     // setimo octante
     ctx.fillRect(largura + x, altura + y, 1, 1);

     // terceiro octante
     ctx.fillRect(largura - x, altura - y, 1, 1);

     // quarto octante
     ctx.fillRect(largura - y, altura - x, 1, 1);

     // quinto octante
     ctx.fillRect(largura - y, altura + x, 1, 1);

     // sexto octante
     ctx.fillRect(largura - x, altura + y, 1, 1);
}

export default PontoMedio