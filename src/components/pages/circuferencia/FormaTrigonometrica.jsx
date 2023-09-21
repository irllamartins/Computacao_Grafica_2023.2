const Trigonometrica = (altura, largura, raio, ctx) => {
    let numeroPonto = 800;
    let anguloPassos = (2 * Math.PI) / numeroPonto; /* Intervalo */
    let i = 0; /*Auxiliar do laço while*/
    let x = 0
    let y = 0
    //console.log("explicita")
    while (i < numeroPonto) {
        let angulo = i * anguloPassos;
        /* Definindo a coordenada X */
        x = Math.round(raio * Math.cos(angulo));
        /* Definindo a coordenada Y */
        y = Math.round(raio * Math.sin(angulo));
        /* Desenhando o ponto */
        //console.log("x", x, "y", y)
        ctx.fillRect(largura - y, altura + x, 1, 1);
        i++;
    }
}
export default Trigonometrica