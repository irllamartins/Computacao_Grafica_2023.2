import _ from 'lodash'
import Grafico from './Grafico';
import * as echarts from 'echarts';

/*const GerarBatimentos = (pontoInicialX: number, pontoInicialY: number, pontoFinalX: number, pontoFinalY: number, ctx: any) => {
    let x = pontoInicialX
    let y = pontoInicialY
    console.log("GerarBatida antes")
    while (x < pontoFinalX) {
        //     while (x < 1) {

        geraPontosLinha(x, y, ctx)
        x += 100
        geraPontosBatimento(x, y, ctx)
        x += 90
        console.log("GerarBatida", x)
    }
}
const geraPontosLinha = (x: number, y: number, ctx: any) => {

    // ctx.beginPath()
    ctx.moveTo(x, y)
    // ctx.lineTo(x,   y)
    // Aplica o traço à linha
    ctx.stroke()
}
const geraPontosBatimento = (x: number, y: number, ctx: any) => {
    const incrementoX = 15
    const incrementoY = 0.1
    const espacamento = 100
    // setTimeout(soma, 2000, 5, 10);
    //    setTimeout(() => {geraPontosLinha(x, y, ctx)}, 2000)

    // ctx.beginPath()
    // ctx.lineTo(x,   y)
    ctx.lineTo(x, y)
   // ctx.moveTo(x, y)
    ctx.lineTo(x + incrementoX, 150)


    ctx.moveTo(x + incrementoX, 150)
    ctx.lineTo(x + incrementoX, y)

    ctx.moveTo(x + incrementoX, y)
     ctx.lineTo(x + (incrementoX * 2), y+150)

    ctx.moveTo(x + (incrementoX * 2),y+150)
    ctx.lineTo(x + (incrementoX * 3),y)

    // segunda subida
    ctx.moveTo(x + (incrementoX * 3), y )
    ctx.lineTo(x + (incrementoX * 4), 80)

    ctx.moveTo(x + (incrementoX * 4),80 )
    ctx.lineTo( x+(incrementoX * 5), y )

    ctx.moveTo(x + (incrementoX * 5), y )
    ctx.lineTo(x + (incrementoX *6), y +150)

    ctx.moveTo(x + (incrementoX * 6), y  +150)
    ctx.lineTo(x + (incrementoX *6), y )

    /*
      ctx.moveTo(x + (incrementoX * 3),- y)
      
      ctx.lineTo(x + (incrementoX * 4), y * incrementoY)
       
         ctx.moveTo(x + (incrementoX * 4), -y)
       ctx.lineTo(x + (incrementoX * 5), y * incrementoY)
      
       console.log("y",-y* incrementoY)
       
       ctx.moveTo(x + (incrementoX * 5),  y * incrementoY)
       ctx.lineTo(x + (incrementoX * 5), y )
       
       ctx.moveTo(x + (incrementoX * 5),  y)
       ctx.lineTo(x + (incrementoX * 5),- y* incrementoY )

}
*/
const GerarBatimentos = () => {
    // Tempo em segundos
    let t = Array.from({length: 500}, (_, i) => i / 500);
    
    // Frequência cardíaca em batimentos por minuto
    let freq_cardiaca = 60;
    
    // Converter frequência cardíaca para Hertz
    let freq_Hz = freq_cardiaca / 60;
    
    // Onda senoidal
    let onda = t.map((t: number) => Math.sin(2 * Math.PI * freq_Hz * t));
    
    return <Grafico t={t} dados={onda}/>
}


export default GerarBatimentos

