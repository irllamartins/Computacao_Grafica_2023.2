import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import DesenharFigura from '../../util/DesenharFigura'

const Transformacoes = ({ tamanho,altura,largura, x, y, figura,funcao }) => {
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
    if(funcao){
      const cont = 250
      ctx.fillStyle = "red"
      ctx.beginPath();
      ctx.moveTo(tamanho/2, (tamanho/2)-funcao.y);
      ctx.lineTo((tamanho/2)+cont*funcao.x,(tamanho/2)-(funcao.x*cont +funcao.y));
      ctx.closePath();
      ctx.stroke();
    }



  }, [tamanho,altura,largura, x, y, figura,funcao ])

  return <canvas ref={canvasRef} width={tamanho} height={tamanho} />
}

export default Transformacoes  