import React, { useRef, useEffect } from 'react'

const Canvas = () => {

    const canvasRef = useRef(null)     
    useEffect(() => {
        // Seleciona o elemento canvas
        const canvas = canvasRef.current

        // Define a largura e altura do canvas
        canvas.width = 500
        canvas.height = 500     

        // Cria um contexto 2D
        const ctx = canvas.getContext('2d')

        // Define a cor da linha
        ctx.strokeStyle = 'green'

        // Define a cor do fundo
        ctx.fillStyle = 'red';

        // Define a largura da linha
        ctx.lineWidth = 5

        // Pinta o fundo do canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenha a linha do ponto (x1, y1) = (100, 100) para (x2, y2) = (300, 100)
        ctx.beginPath()
        ctx.moveTo(100, 100)
        ctx.lineTo(300, 100)
        ctx.stroke()
    }, [])
    return <canvas ref={canvasRef} width={500} height={500} />
}

export default Canvas;
