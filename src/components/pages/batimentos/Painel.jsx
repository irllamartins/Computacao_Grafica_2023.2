import { useRef, useEffect } from 'react'
import DDA from './DDA'
// import GerarBatimentos from './GerarBatimentos'

const Painel = ({ tamanho, aumentoLagura, pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY }) => {
  const canvasRef = useRef(null)
 
  const Batimento = (x,y,ctx)=>{
    console.log("entrei",x,y)
    DDA(x, y, x+20, y+130,ctx)
    DDA( x+20, y+130,x+40, y-130,ctx)
    DDA( x+40, y-130, x+60, y,ctx)
  }

  let speed = 2
  let x = 0;
  let y = tamanho / 2;
  let ondas=0
  let prevOndas=0
  let add = 60      
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'green';

    const drawPoint = () => {
      //  ctx.clearRect(0, 0, canvas.width, canvas.height); 
      x += speed;

      // Calcula a porcentagem do caminho entre pontoInicialX e pontoFinalX
      let a = (x - pontoInicialX) / (pontoFinalX - pontoInicialX);
      // y = (1 - a) * pontoInicialY + a * pontoFinalY;
      //const x=20 y=130

      
     
      if (x === ondas ) {
        Batimento(x,y,ctx)
        prevOndas= ondas
        ondas+= 200
        x+= add
       }
       if(x<=prevOndas||x<=ondas){
         ctx.fillRect(x, y, 2, 2);
       }  

   console.log(x)

      if (x > canvas.width) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x += speed;
        x = 0;
        ondas=200
        prevOndas=200
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