import { useRef, useEffect, useState } from "react"

const GeraImagem = (props) => {
    const {matriz,largura,altura}  = props

    const canvasRef = useRef(null)
// console.log("m:",matriz)
    useEffect(() => {
        const canvas = canvasRef.current

        const ctx = canvas.getContext('2d')
        let imageData = ctx.createImageData(largura, altura)
       
        for (let i = 0; i < matriz.length; i++) {
            for (let j = 0; j < matriz[i].length; j++) {
                
                const index = (i * matriz[i].length + j) * 4
                imageData.data[index] = matriz[i][j]  // Vermelho
                imageData.data[index + 1] = matriz[i][j] // Verde
                imageData.data[index + 2] = matriz[i][j] // Azul
                imageData.data[index + 3] = 255           // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0)

    }, [matriz]);

    return <canvas ref={canvasRef} width={largura} height={altura} />;

}
export default GeraImagem 