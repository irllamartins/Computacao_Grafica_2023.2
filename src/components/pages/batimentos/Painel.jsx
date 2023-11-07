import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import GerarBatimentos from './GerarBatimentos'

const Painel = ({ tamanho, pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY }) => {
  const canvasRef = useRef(null)
  let mudou = false
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')


    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.strokeStyle = 'green'
    mudou = GerarBatimentos(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, ctx)

  }, [tamanho, pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY,mudou])

  return <canvas ref={canvasRef} width={tamanho} height={tamanho} />
}

export default Painel  