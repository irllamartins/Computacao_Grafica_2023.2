import { useRef, useEffect, useState } from "react"
import _, { forEach } from 'lodash';
import sortArray from 'sort-array'

//adicao de duas imagem
export const adicao = (imagemA: number[][], imagemB: number[][], maximoCor: number) => {
    let resultado = []
    for (let i = 0; i < imagemA.length; i++) {
        let array = []
        for (let j = 0; j < imagemA[0].length; j++) {
            let operacao = imagemA[i][j] + imagemB[i][j]
            // trunca valores
            if (operacao > maximoCor) {
                operacao = maximoCor
            }
            else if (operacao < 0) {
                operacao = 0
            }
            array.push(operacao)
        }
        resultado.push(array)
    }


    return resultado
}
//subtracao de duas imagem
export const subtracao = (imagemA: number[][], imagemB: number[][], maximoCor: number) => {
    let resultado = []
    for (let i = 0; i < imagemA.length; i++) {
        let array = []
        for (let j = 0; j < imagemA[0].length; j++) {
            let operacao = imagemA[i][j] - imagemB[i][j]
            // trunca valores
            if (operacao > maximoCor) {
                operacao = maximoCor
            }
            else if (operacao < 0) {
                operacao = 0
            }
            array.push(operacao)
        }
        resultado.push(array)
    }


    return resultado
}


// multiplicacao entre matrizes
export const multiplicacao = (imagemA: number[][], imagemB: number[][], maximoCor: number) => {
    let resultado = []
    for (let i = 0; i < imagemA.length; i++) {
        let array = []
        for (let j = 0; j < imagemA[0].length; j++) {
            let operacao = Math.round(imagemA[i][j] * imagemB[i][j])
            // trunca valores
            if (operacao > maximoCor) {
                operacao = maximoCor
            }
            else if (operacao < 0) {
                operacao = 0
            }
            array.push(operacao)
        }
        resultado.push(array)
    }


    return resultado
}

//divisao de duas imagem
export const divisao = (imagemA: number[][], imagemB: number[][], maximoCor: number) => {
    let resultado = []
    for (let i = 0; i < imagemA.length; i++) {
        let array = []
        for (let j = 0; j < imagemA[0].length; j++) {
            let operacao = Math.round(imagemA[i][j] / imagemB[i][j])
            // trunca valores
            if (operacao > maximoCor) {
                operacao = maximoCor
            }
            else if (operacao < 0) {
                operacao = 0
            }
            array.push(operacao)
        }
        resultado.push(array)
    }


    return resultado
}

//operacao de "ou" duas imagem
export const or = (imagemA: number[][], imagemB: number[][], maximoCor: number) => {
    let binario = []
    for (let i = 0; i < imagemA.length; i++) {
        let array = []
        
        for (let j = 0; j < imagemA[0].length; j++) {
            let operacao = 0
            const binario1 = imagemA[i][j] > Math.round(maximoCor / 2) ? true : false
            const binario2 = imagemB[i][j] > Math.round(maximoCor / 2) ? true : false
            // trunca valores
            if (binario1||binario2) {
                operacao = maximoCor
            }
            array.push(operacao)
        }
        binario.push(array)
    }


    return binario
}

//operacao de "ou exclusivo" duas imagem
export const xor = (imagemA: number[][], imagemB: number[][], maximoCor: number) => {
    let binario = []
    for (let i = 0; i < imagemA.length; i++) {
        let array = []
        for (let j = 0; j < imagemA[0].length; j++) {
            let operacao = 0
            // trunca valores
            const binario1 = imagemA[i][j] > Math.round(maximoCor / 2) ? true : false
            const binario2 = imagemB[i][j] > Math.round(maximoCor / 2) ? true : false
            if ((binario1 || binario2) && binario1 !== binario2) {
                operacao = maximoCor
            }
            array.push(operacao)
        }
        binario.push(array)
    }
    return binario
}

//operacao de "and" duas imagem
export const and = (imagemA: number[][], imagemB: number[][], maximoCor: number) => {
    let binario = []
    for (let i = 0; i < imagemA.length; i++) {
        let array = []
        for (let j = 0; j < imagemA[0].length; j++) {
            let operacao = 0
            // trunca valores
            const binario1 = imagemA[i][j] > Math.round(maximoCor / 2) ? true : false
            const binario2 = imagemB[i][j] > Math.round(maximoCor / 2) ? true : false
            if ( binario1 === binario2) {
                operacao = maximoCor
            }
            array.push(operacao)
        }
        binario.push(array)
    }
    return binario
}