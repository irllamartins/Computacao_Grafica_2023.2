import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import DesenharFigura from '../../util/DesenharFigura'
import DesenharReta from './DesenharReta'
import DesenhaTela from './DesenharTela'
import Recorte from './Recorte'        

const PainelRecorte = ({ tamanho, tamanhoWidth, tamanhoHeight, retas, xInicial, yInicial, xFinal, yFinal }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Deseja o retangulo da tela
    DesenhaTela(tamanho, xInicial, yInicial, xFinal, yFinal, ctx)
    Recorte(tamanho, retas, xInicial, yInicial, xFinal, yFinal, ctx)
  }, [tamanho, retas, xInicial, yInicial, xFinal, yFinal])

  return <canvas ref={canvasRef} width={tamanhoWidth} height={tamanhoHeight} />
}

export default PainelRecorte  