import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import DDA from './DDA'
import { AlgoritimosTipos } from './Conteiner'
import Bresenham from './Bresenham'

const Reta = ({ tamanhoX, tamanhoY, pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, opcao }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')


    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    DesenharLimite(ctx, canvas)

    // Define a cor da reta
    ctx.fillStyle = 'red'
    if (opcao === AlgoritimosTipos.DDA) {
      DDA(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, ctx, canvas.height, canvas.width)
    }
    if (opcao === AlgoritimosTipos.BRESENHAM) {
      Bresenham(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, ctx, canvas.height, canvas.width)
    }


  }, [tamanhoX, tamanhoY, pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY,opcao])

  return <canvas ref={canvasRef} width={tamanhoX} height={tamanhoY} />
}

export default Reta 