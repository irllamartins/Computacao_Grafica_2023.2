import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'

const Transformacoes = ({ tamanhoX,tamanhoY, x, y, propocao }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')


    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   

    // Define a cor do círculo
    ctx.fillStyle = 'orange'    

   //  DesenharLimite(ctx,canvas)

    // Desenha o pixel na posição (x, y) = (250, 250)
    ctx.fillRect(x, y, propocao, propocao);



  }, [tamanhoX,tamanhoY, x, y,propocao])

  return <canvas ref={canvasRef} width={tamanhoX} height={tamanhoY} />
}

export default Transformacoes  