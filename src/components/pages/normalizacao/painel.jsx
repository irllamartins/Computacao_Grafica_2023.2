import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'

const Transformacoes = ({ tamanhoX,tamanhoY, x, y,propocao}) => {
  const canvasRef = useRef(null)
console.log("x:",x,"y:",y)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')


    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   

    // Define a cor do círculo
    ctx.fillStyle = 'orange'    

    // DesenharLimite(ctx,canvas)

    // Desenha o pixel na posição (x, y) = (250, 250)(falta saber a distancia que seria o ponto 0)
    //ctx.fillRect((canvas.width/2)+x, (canvas.height/2)-y, propocao, propocao);
    ctx.fillRect(x*propocao,y*propocao, 10, 10);



  }, [tamanhoX,tamanhoY, x, y,propocao])

  return <canvas ref={canvasRef} width={tamanhoX+1} height={tamanhoY+1} />
}

export default Transformacoes  