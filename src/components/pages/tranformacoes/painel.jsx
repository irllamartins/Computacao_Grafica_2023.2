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
    ctx.fillRect(0, 0, canvas.width*propocao, canvas.height*propocao);
   

    // Define a cor do círculo
    ctx.fillStyle = 'orange'    

   //  DesenharLimite(ctx,canvas)

    // Desenha o pixel na posição (x, y) = (250, 250)(falta saber a distancia que seria o ponto 0)
    ctx.fillRect(x*propocao, y*propocao, propocao, propocao);



  }, [tamanhoX,tamanhoY, x, y,propocao])

  return <canvas ref={canvasRef} width={tamanhoX*propocao} height={tamanhoY*propocao} />
}

export default Transformacoes  