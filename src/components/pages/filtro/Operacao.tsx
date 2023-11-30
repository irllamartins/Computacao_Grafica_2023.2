import { useRef, useEffect, useState } from "react"
import _, { forEach } from 'lodash';
import sortArray from 'sort-array'

const adicionarBorda = (matriz: number[][]) => {
    const cloneMatriz = _.cloneDeep(matriz)
    // Adiciona zeros no início e no final de cada linha
    for (let i = 0; i < cloneMatriz?.length; i++) {
        cloneMatriz[i].unshift(0);
        cloneMatriz[i].push(0);
    }

    // Cria uma linha de zeros
    let linhaZeros = Array(cloneMatriz[0]?.length).fill(0);

    // Adiciona a linha de zeros no início e no final da matriz
    cloneMatriz.unshift(linhaZeros);
    cloneMatriz.push([...linhaZeros]);
    //  console.log(matriz)

    return cloneMatriz
}
// criação da imagem final 
const aplicacaoMascaraMultiplicacao = (imagemB: number[][], mascara: number[][]) => {
    const resultado: number[][] = []
    for (let i = 0; i < imagemB.length - 2; i++) {
        let array = []
        for (let j = 0; j < imagemB[0].length - 2; j++) {
            const mini = minimatriz(imagemB, mascara, i, j)
            //  console.log(mini)
            array.push(multiplicacao(mini, mascara))
        }
        resultado.push(array)
    }
    return resultado;

}
// captura uma matriz 3x3
const minimatriz = (imagem: number[][], mascara: number[][], inicio_x: number, inicio_y: number) => {
    const miniImagem: number[][] = []
    // console.log("imagem", imagem, "mascara", mascara)
    for (let k = 0; k < mascara.length; k++) {
        let array = []
        for (let l = 0; l < mascara[0].length; l++) {
            array.push(imagem[k + inicio_x][l + inicio_y])

        }
        //console.log("for mini"+k, array)
        miniImagem.push(array)
    }

    return miniImagem
}
// multiplicacao entre matrizes
const multiplicacao = (imagem: number[][], mascara: number[][]) => {
    let resultado = 0
    for (let i = 0; i < mascara.length; i++) {
        for (let j = 0; j < mascara[0].length; j++) {
            let produto = imagem[i][j] * mascara[i][j]
            resultado += Math.round(produto)
        }
    }
    // trunca valores
    if (resultado > 255) {
        resultado = 255
    }
    else if (resultado < 0) {
        resultado = 0
    }
    console.log("multiplicacao",resultado)
    return resultado
}
export const aplicacaoMascaraMediana = (imagemOriginal: number[][]) => {
    let mascara: number[][] = Array(3).fill(Array(3).fill(0))
    let imagemB: number[][] = adicionarBorda(imagemOriginal)
    let resultado: number[][] = []

    // console.log(mascara)

    for (let i = 0; i < imagemB[0].length - 2; i++) {
        let array = []
        for (let j = 0; j < imagemB.length - 2; j++) {
            array.push(mediana(minimatriz(imagemB, mascara, i, j), mascara))
        }
        resultado.push(array)
    }
    return resultado;
}
const mediana = (imagem: number[][], mascara: number[][]) => {
    let lista: number[] = []
    for (let i = 0; i < mascara.length; i++) {
        for (let j = 0; j < mascara[0].length; j++) {
            lista.push(imagem[i][j])

        }
    }
    //console.log("antes",lista)
    sortArray(lista)
    //console.log("sort",lista)
    let resultado = lista[5]
    if (resultado > 255) {
        resultado = 255;
    }
    else if (resultado < 0) {
        resultado = 0;
    }

    return resultado;
}

const Operacao = (imagemOriginal: number[][], mascara: number[][]) => {

    const imagem: number[][] = adicionarBorda(imagemOriginal)
    const resultado: number[][] = aplicacaoMascaraMultiplicacao(imagem, mascara)

    return resultado

}
export default Operacao

export const magnetude = (filtroX: number[][], filtroY: number[][]) => {
    let resultado: number[][] = []

    // console.log(mascara)

    for (let i = 0; i < filtroX.length; i++) {
        let array = []
        for (let j = 0; j < filtroX[0].length; j++) {
            array.push(Math.abs(filtroX[i][j])+Math.abs(filtroY[i][j]))
        }
        resultado.push(array)
    }
    return resultado;
}

export const magnetudePrewitt = (imagem: number[][]) => {
    let resultado: number[][] = []
    let filtroX: number[][] = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]]
    let filtroY: number[][] = [[-1, -1, -1], [0, 0, 0], [1, 1, 1]] 

    for (let i = 0; i < imagem.length - 2; i++) {
        let array = []
        for (let j = 0; j < imagem[0].length - 2; j++) {
            let sumX = 0
            let sumY = 0
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    sumX += imagem[i + k][j + l] * filtroX[k][l]
                    sumY += imagem[i + k][j + l] * filtroY[k][l]
                }
            }
            array.push(Math.abs(sumX) + Math.abs(sumY))
        }
        resultado.push(array)
    }
    return resultado;
}
export const magnetudeRobert = (imagem: number[][]) => {
    let resultado: number[][] = []
    let filtroX: number[][] = [[0, 0, 0], [0, 1, 0], [0, -1, 0]]
    let filtroY: number[][] = [[0, 0, 0], [0, 1, -1], [0, 0, 0]]

    for (let i = 0; i < imagem.length - 2; i++) {
        let array = []
        for (let j = 0; j < imagem[0].length - 2; j++) {
            let sumX = 0
            let sumY = 0
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    sumX += imagem[i + k][j + l] * filtroX[k][l]
                    sumY += imagem[i + k][j + l] * filtroY[k][l]
                }
            }
            array.push(Math.abs(sumX) + Math.abs(sumY))
        }
        resultado.push(array)
    }
    return resultado;
}
export const magnetudeRobertCruzado = (imagem: number[][]) => {
    let resultado: number[][] = []
    let filtroX: number[][] = [[0, 0, 0], [0, 1, 0], [0, 0, -1]]
    let filtroY: number[][] = [[0, 0, 0], [0, 0, 1], [0, -1, 0]]

    for (let i = 0; i < imagem.length - 2; i++) {
        let array = []
        for (let j = 0; j < imagem[0].length - 2; j++) {
            let sumX = 0
            let sumY = 0
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    sumX += imagem[i + k][j + l] * filtroX[k][l]
                    sumY += imagem[i + k][j + l] * filtroY[k][l]
                }
            }
            array.push(Math.abs(sumX) + Math.abs(sumY))
        }
        resultado.push(array)
    }
    return resultado;
}
export const magnetudeSobel = (imagem: number[][]) => {
    let resultado: number[][] = []
    let filtroX: number[][] = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]] // Filtro Prewitt X
    let filtroY: number[][] = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] // Filtro Prewitt Y

    for (let i = 0; i < imagem.length - 2; i++) {
        let array = []
        for (let j = 0; j < imagem[0].length - 2; j++) {
            let sumX = 0
            let sumY = 0
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    sumX += imagem[i + k][j + l] * filtroX[k][l]
                    sumY += imagem[i + k][j + l] * filtroY[k][l]
                }
            }
            array.push(Math.abs(sumX) + Math.abs(sumY))
        }
        resultado.push(array)
    }
    return resultado;
}
