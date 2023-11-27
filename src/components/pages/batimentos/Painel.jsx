import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import GerarBatimentos from './GerarBatimentos'

const Painel = ({ tamanho, aumentoLagura, pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY}) => {
  const canvasRef = useRef(null)

  let speed = 2
  let x = 0;
  let y = tamanho / 2;
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'green';

    const drawPoint = () => {
    //  ctx.clearRect(0, 0, canvas.width, canvas.height);
      x += speed;

      // Calcula a porcentagem do caminho entre pontoInicialX e pontoFinalX
      let a = (x - pontoInicialX) / (pontoFinalX - pontoInicialX);

      // Aplica a interpolação linear para calcular y
      if ((x > 125 && x < 251)||(x > 376 && x < 504)) {   
        y = (1 - a) * pontoInicialY + a * (tamanho / 2 + Math.sin(x / 20) * 80);
      } else {
        y = tamanho / 2;
      }

      ctx.fillRect(x, y, 2,2);

      if (x > canvas.width) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        x += speed;
        x = 0;
      }

      // Chama a função drawPoint novamente no próximo frame de animação
      requestAnimationFrame(drawPoint);
    };

    // Inicia o loop de animação
    drawPoint();

  }, [tamanho, pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, aumentoLagura])

  return <canvas ref={canvasRef} width={tamanho * aumentoLagura} height={tamanho} />
}

export default Painel  