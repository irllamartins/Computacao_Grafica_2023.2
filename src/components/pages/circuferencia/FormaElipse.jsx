const Elipse = (altura,largura, b,a, ctx) => {
    let x = 0
    let y = b
    let d1 = b * b - a * a * b + a * a / 4.0;
    let d2

  
    // simetria de ordem 4
    simetria(altura,largura,x, y, ctx)

    while (a * a * (y - 0.5) > b * b * (x + 1)) {
        /* Regiao 1 */
        if (d1 < 0) {
            d1 = d1 + b * b * (2 * x + 3);
            x++
        }
        else {
            d1 = d1 + b * b * (2 * x + 3) + a * a * (-2 * y + 2);
            x++;
            y--;
        }
        simetria(altura,largura,x, y, ctx);    
    }
    d2 = b * b * (x + 0.5) * (x + 0.5) + a * a * (y - 1) * (y - 1) - a * a * b * b;
    while (y > 0) {
        /* Regiao 2 */
        if (d2 < 0) {
            d2 = d2 + b * b * (2 * x + 2) + a * a * (-2 * y + 3);
            x++;
            y--;
        } else {
            d2 = d2 + a * a * (-2 * y + 3);
            y--;
        }
        simetria(altura,largura,x, y, ctx);
    }
    

}
const simetria = (altura,largura,x, y, ctx) => {
    
    // segundo octante
    // ctx.fillRect(largura + x, altura - y, 1, 1);

    // oitavo octante
    ctx.fillRect(largura + y, altura + x, 1, 1);

    // primeiro octante
    ctx.fillRect(largura + y, altura - x, 1, 1);

    // setimo octante
    // ctx.fillRect(largura + x, altura + y, 1, 1);

    // terceiro octante
    //ctx.fillRect(largura - x, altura - y, 1, 1);

    // quarto octante
    ctx.fillRect(largura - y, altura - x, 1, 1);

    // quinto octante
    ctx.fillRect(largura - y, altura+ x, 1, 1);

    // sexto octante
   // ctx.fillRect(largura - x, altura + y, 1, 1);
}

export default Elipse 
