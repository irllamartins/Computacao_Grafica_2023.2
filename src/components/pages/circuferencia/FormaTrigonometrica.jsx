const Trigonometrica = (altura,largura,raio,ctx) =>{
    let y 
    for(let cont= -raio; cont<raio; cont++) {
         y= Math.abs( Math.sqrt( Math.pow(raio, 2)-Math.pow(cont, 2),2));
         ctx.fillRect( Math.abs(largura-cont), Math.abs(altura+y));
         ctx.fillRect( Math.abs(largura+cont), Math.abs(altura-y));
    }

}
export default Trigonometrica 