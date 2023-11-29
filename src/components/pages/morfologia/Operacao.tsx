import { useRef, useEffect, useState } from "react"
import _, { forEach } from 'lodash';
import sortArray from 'sort-array'

export const transfomarBinario = (matriz: number[][],maximoCor:number) => {
    const cloneMatriz = _.cloneDeep(matriz)
    let soma = somaDeCinza(cloneMatriz)
    let media = soma/(cloneMatriz.length*cloneMatriz[0].length)
    console.log("matriz",cloneMatriz)
    console.log("Media:",media, "| Soma",soma, "| divisao",cloneMatriz.length*cloneMatriz[0].length)
    for (let i = 0; i < cloneMatriz.length; i++) {
        for (let j = 0; j < cloneMatriz.length; j++) {
            if(cloneMatriz[i][j]>=media){
                cloneMatriz[i][j] = maximoCor
            }
            else
                cloneMatriz[i][j] = 0
        }
    }
    return cloneMatriz
}

const somaDeCinza = (matriz: number[][]) => {
    let soma=0
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
           soma+=matriz[i][j]
        }
        
    }
    console.log("Soma:",soma)
    return soma
}
const Operacao = (imagem: number[][], mascara: number[][]) => {
    const resultado: number[][] = []

    return resultado

}
export default Operacao