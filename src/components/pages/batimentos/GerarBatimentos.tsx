const GerarBatimentos = (pontoInicialX: number, pontoInicialY: number, pontoFinalX: number, pontoFinalY: number, ctx: any) => {
    let x = pontoInicialX
    let y = pontoInicialY
    console.log("GerarBatida antes")
    while (x < pontoFinalX) {
        
        geraPontosLinha(x, y, ctx)
        x += 100
        geraPontosBatimento(x, y, ctx)
        x += 90
        console.log("GerarBatida")
    }
}
const geraPontosLinha = (x: number, y: number, ctx: any) => {
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.moveTo( x,ctx.canvas.width/2)
    ctx.lineTo(ctx.canvas.width,ctx.canvas.width/2- y)
    // Aplica o traço à linha
    ctx.stroke()  
}
const geraPontosBatimento = (x: number, y: number, ctx: any) => {
   const incrementoX = 15
   const incrementoY = 2
   const espacamento = 100
   // setTimeout(soma, 2000, 5, 10);
   ctx.beginPath()
   ctx.moveTo( x,y)
   ctx.lineTo(x+incrementoX,80)
   ctx.stroke() 
   ctx.moveTo( x+incrementoX,80)
   ctx.lineTo(x+incrementoX,- y)
   ctx.stroke() 
   ctx.moveTo( x+incrementoX,- y)
   ctx.lineTo(x+(incrementoX*2),-y*incrementoY)
   ctx.stroke() 
   ctx.moveTo( x+(incrementoX*2),-y*incrementoY)
   ctx.lineTo(x+(incrementoX*3),-y*incrementoY)
   ctx.stroke()
   ctx.moveTo( x+(incrementoX*3),-y*incrementoY)
   ctx.lineTo(x+(incrementoX*4),y)
   ctx.stroke()
   ctx.moveTo( x+(incrementoX*4),y)
   ctx.lineTo(x+(incrementoX*5),0)
   ctx.stroke()

}

export default GerarBatimentos