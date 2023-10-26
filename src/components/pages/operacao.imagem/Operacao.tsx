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
            let binario1 = imagemA[i][j].toString(2)
            let binario2 = imagemB[i][j].toString(2)

            const maxLength = Math.max(binario1.length, binario2.length);

            // Adicione zeros à esquerda para igualar o comprimento das representações binárias
            binario1 = binario1.padStart(maxLength, '0')
            binario2 = binario2.padStart(maxLength, '0')

            let resultado = ''

            for (let i = 0; i < maxLength; i++) {
                // Aplicar a operação AND bit a bit
                const digito1 = binario1[i]
                const digito2 = binario2[i]
                const xor = (digito1 === '1' || digito2 === '1') ? '1' : '0'
                resultado += xor
            }

            array.push(parseInt(resultado, 2))
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
          
            let binario1 = imagemA[i][j].toString(2)
            let binario2 = imagemB[i][j].toString(2)

            const maxLength = Math.max(binario1.length, binario2.length);

            // Adicione zeros à esquerda para igualar o comprimento das representações binárias
            binario1 = binario1.padStart(maxLength, '0')
            binario2 = binario2.padStart(maxLength, '0')

            let resultado = ''

            for (let i = 0; i < maxLength; i++) {
                // Aplicar a operação AND bit a bit
                const digito1 = binario1[i]
                const digito2 = binario2[i]
                const xor = ((digito1 === '1' || digito2 === '1') && digito1 !== digito2) ? '1' : '0'
                resultado += xor
            }

            array.push(parseInt(resultado, 2))
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

            let binario1 = imagemA[i][j].toString(2)
            let binario2 = imagemB[i][j].toString(2)

            const maxLength = Math.max(binario1.length, binario2.length);

            // Adicione zeros à esquerda para igualar o comprimento das representações binárias
            binario1 = binario1.padStart(maxLength, '0')
            binario2 = binario2.padStart(maxLength, '0')

            let resultado = ''

            for (let i = 0; i < maxLength; i++) {
                // Aplicar a operação AND bit a bit
                const digito1 = binario1[i]
                const digito2 = binario2[i]
                const and = digito1 === '1' && digito2 === '1' ? '1' : '0'
                resultado += and
            }

            array.push(parseInt(resultado, 2))
        }
        binario.push(array)
    }
    return binario
}
