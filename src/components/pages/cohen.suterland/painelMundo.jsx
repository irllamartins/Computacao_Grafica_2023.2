import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import DesenharFigura from '../../util/DesenharFigura'
import DesenharReta from '../../util/DesenharReta'
import DesenhaTela from './desenharTela'

const PainelMundo = ({ tamanho, figura, xInicial, yInicial, xFinal, yFinal }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    DesenharReta(tamanho, figura, ctx)
    DesenhaTela(tamanho, xInicial, yInicial, xFinal, yFinal, ctx)
  }, [tamanho, figura, xInicial, yInicial, xFinal, yFinal])

  return <canvas ref={canvasRef} width={tamanho} height={tamanho} />
}

export default PainelMundo 