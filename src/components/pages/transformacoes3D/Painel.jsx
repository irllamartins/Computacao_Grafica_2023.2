import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import DesenharFigura from './DesenharFigura'

const Transformacoes = ({ tamanho,altura,largura, x, y, figura }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const cor = 'orange'

    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // Define a cor do círculo
    ctx.fillStyle = cor

    DesenharLimite(ctx, canvas)
    DesenharFigura(tamanho,figura, cor, ctx)



  }, [tamanho,altura,largura, x, y, figura ])

  return <canvas ref={canvasRef} width={tamanho} height={tamanho} />
}

export default Transformacoes  