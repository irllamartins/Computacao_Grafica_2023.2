import React, { useRef, useEffect } from 'react'
import DesenharLimite from '../../util/PlanoCartesiano'
import { AlgoritimosTipos } from './Conteiner'
import PontoMedio from "./PontoMedio"
import Trigonometrica from './FormaTrigonometrica'
import Explicita from './FormaExplicita'


const Circuferencia = ({ tamanho,altura,largura, raio, opcao }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')


    // Define a cor do fundo
    ctx.fillStyle = '#2b2b2b'

    // Pinta o fundo do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    DesenharLimite(ctx, canvas)

    // Define a cor do ponto

    ctx.fillStyle = 'red'
   // console.log(AlgoritimosTipos.MEDIO,"op",opcao)
    if (opcao === AlgoritimosTipos.MEDIO) {
      PontoMedio(altura,largura,raio,ctx)
    }
    else if(opcao === AlgoritimosTipos.TRIGONOMETRICA){
      Trigonometrica(altura,largura,raio,ctx)
    }
    else if(opcao === AlgoritimosTipos.EXPLICITA){
      console.log("entrei")
      Explicita(altura,largura,raio,ctx)
    }
  
  }, [raio, largura, altura,opcao])

  return <canvas ref={canvasRef} width={tamanho} height={tamanho} />
}

export default Circuferencia   