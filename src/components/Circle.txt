import React, { useRef, useEffect } from 'react'

const Canvas = ()=> {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Define a cor do círculo
    ctx.fillStyle = 'red';

    // Desenha o círculo na posição (x, y) = (250, 250) com raio 50
    ctx.beginPath();
    ctx.arc(250, 250, 50, 0, 2 * Math.PI)
    ctx.fill()
  }, [])

  return <canvas ref={canvasRef} width={500} height={500} />
}

export default Canvas
