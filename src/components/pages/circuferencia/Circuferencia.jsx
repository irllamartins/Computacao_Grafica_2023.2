import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'

const Circuferencia = ({ tamanho, raio, x, y }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')


    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   

    // Define a cor do círculo
    ctx.fillStyle = 'red';

    DesenharLimite(ctx,canvas)

    // Desenha o pixel na posição (x, y) = (250, 250)
    ctx.fillRect(x, y, 1, 1);



  }, [raio, x, y])

  return <canvas ref={canvasRef} width={tamanho} height={tamanho} />
}

export default Circuferencia   