const Explicita = (altura, largura,raio,ctx) => {
    let numeroPonto = 800;
    let anguloPassos = (2 * Math.PI) / numeroPonto; /* Intervalo */
    let i = 0; /*Auxiliar do laço while*/
    let x
    let y
    console.log("explicita")
    while (i < numeroPonto) {
        let angulo = i * anguloPassos;
        /* Definindo a coordenada X */
        x = Math.abs(x + raio * Math.cos(angulo));
        /* Definindo a coordenada Y */
        y = Math.abs(y + raio * Math.sin(angulo));
        /* Desenhando o ponto */
        console.log("x",x,"y",y)
        ctx.fillRect(altura + x, largura - y, 1, 1);
        i++;
    }
}
export default Explicita