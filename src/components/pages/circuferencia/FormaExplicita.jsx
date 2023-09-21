const Explicita = (altura, largura, raio, ctx) => {
    for (let cont = -raio; cont < raio; cont++) {
        let y = Math.sqrt(Math.pow(raio, 2) - Math.pow(cont, 2));
        /* Desenhando ponto */
        ctx.fillRect(largura - cont, altura + y, 1, 1);
        ctx.fillRect(largura + cont, altura - y, 1, 1);
    }
}
export default Explicita