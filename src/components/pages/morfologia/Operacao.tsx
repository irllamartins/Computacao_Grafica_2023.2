import { useRef, useEffect, useState } from "react"
import _, { forEach } from 'lodash';
import sortArray from 'sort-array'

// transfoma a imagem original em uma imagem
export const transfomarBinario = (matriz: number[][], maximoCor: number) => {
    const cloneMatriz = _.cloneDeep(matriz)
    let soma = somaDeCinza(cloneMatriz)
    let media = soma / (cloneMatriz.length * cloneMatriz[0].length)

    // console.log("Media:", media, "| Soma", soma, "| divisao", cloneMatriz.length * cloneMatriz[0].length)
    for (let i = 0; i < cloneMatriz.length; i++) {
        for (let j = 0; j < cloneMatriz[0].length; j++) {
            if (cloneMatriz[i][j] >= media) {
                cloneMatriz[i][j] = maximoCor
            }
            else
                cloneMatriz[i][j] = 0
        }
    }
    return cloneMatriz
}

const somaDeCinza = (matriz: number[][]) => {
    let soma = 0
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            soma += matriz[i][j]
        }

    }
    console.log("Soma:", soma)
    return soma
}


export const aplicacaoMascaraBinaria = (imagem: number[][], mascara: number[][], pixelAtivo: number[]) => {
    let resultado: number[][] = Array(imagem[0].length).fill(null).map(() => Array(imagem.length).fill(0))

    for (let i = 0; i < imagem.length - 2; i++) {
        for (let j = 0; j < imagem[0].length - 2; j++) {

            if (imagem[i][j] === 255) {
                for (let k = 0; k < mascara.length; k++) {
                    for (let l = 0; l < mascara[0].length; l++) {
                        console.log(i, "|", j, "|");

                        resultado[i][j] = mascara[k][l]
                    }

                }

            }

        }
    }
    return resultado;

}
export const dilatarCinza = (imagem: number[][], mascara: number[][], pixelAtivo: number[]) => {
    let imagemDilatada: number[][] = _.cloneDeep(imagem); // Cria uma cópia da imagem original
    let centroMascara = Math.floor(mascara.length / 2); // Encontra o centro da máscara

    for (let i = -centroMascara; i <= centroMascara; i++) {
        for (let j = -centroMascara; j <= centroMascara; j++) {
            let xi = pixelAtivo[0] + i;
            let yj = pixelAtivo[1] + j;
            if (xi >= 0 && xi < imagem.length && yj >= 0 && yj < imagem[0].length) {
                imagemDilatada[xi][yj] = Math.max(imagemDilatada[xi][yj], mascara[i + centroMascara][j + centroMascara]);
            }
        }
    }
    return imagemDilatada;
}
/*export const dilatar = (imagem: number[][], mascara: number[][]) => {
    console.log("m",mascara)
    let imagemDilatada: number[][] = [];
    for (let i = 0; i < imagem.length; i++) {
        imagemDilatada[i] = [];
        for (let j = 0; j < imagem[0].length; j++) {

            if (imagem[i][j] === 255) {
                console.log("entrou")
                
                for (let k = 0; k < mascara.length; k++) {
                    for (let l = 0; l < mascara[0].length; l++) {
                    //    if (i + k < imagem.length && j + l < imagem[0].length) {
                            imagemDilatada[i + k][j + l] = mascara[k][l]
    
                      //  }
                    }
                }
            } else {
                imagemDilatada[i][j] = 0;
            }
        }
    }
    return imagemDilatada;
    
}*/

export const dilatarImagem = (imagem: number[][], mascara: number[][]) => {
    let imagemDilatada: number[][] = _.cloneDeep(imagem); // Cria uma cópia da imagem original
    for (let i = 0; i < imagem.length; i++) {
        for (let j = 0; j < imagem[0].length; j++) {
            // Apenas realiza a dilatação se o pixel na imagem original é 255 (ativo)
            if (imagem[i][j] === 0) {
                imagemDilatada = dilatar(imagemDilatada, mascara, [i, j]);
            }
        }
    }
    return imagemDilatada;
}

const dilatar = (imagem: number[][], mascara: number[][], pixelAtivo: number[]) => {
    let imagemDilatada: number[][] = _.cloneDeep(imagem); // Cria uma cópia da imagem original
    let centroMascara = Math.floor(mascara.length / 2); // Encontra o centro da máscara

    for (let i = -centroMascara; i <= centroMascara; i++) {
        for (let j = -centroMascara; j <= centroMascara; j++) {
            let xi = pixelAtivo[0] + i;
            let yj = pixelAtivo[1] + j;
            if (xi >= 0 && xi < imagem.length && yj >= 0 && yj < imagem[0].length) {
                // Se o elemento da máscara é 1, então o pixel é dilatado
                if (mascara[i + centroMascara][j + centroMascara] === 1) {
                    imagemDilatada[xi][yj] = 0;
                }
            }
        }
    }
    return imagemDilatada;
}

export const erodirImagem = (imagem: number[][], mascara: number[][]) => {
    let imagemErodida: number[][] = _.cloneDeep(imagem); // Cria uma cópia da imagem original
    for (let i = 0; i < imagem.length; i++) {
        for (let j = 0; j < imagem[0].length; j++) {
            // Apenas realiza a erosão se o pixel na imagem original é 255 (ativo)
            if (imagem[i][j] === 255) {
                imagemErodida = erodir(imagemErodida, mascara, [i, j]);
            }
        }
    }
    return imagemErodida;
}

const erodir = (imagem: number[][], mascara: number[][], pixelAtivo: number[]) => {
    let imagemErodida: number[][] = _.cloneDeep(imagem); // Cria uma cópia da imagem original
    let centroMascara = Math.floor(mascara.length / 2); // Encontra o centro da máscara

    for (let i = -centroMascara; i <= centroMascara; i++) {
        for (let j = -centroMascara; j <= centroMascara; j++) {
            let xi = pixelAtivo[0] + i;
            let yj = pixelAtivo[1] + j;
            if (xi >= 0 && xi < imagem.length && yj >= 0 && yj < imagem[0].length) {
                // Se o elemento da máscara é 1, então o pixel é erodido
                if (mascara[i + centroMascara][j + centroMascara] === 1) {
                    imagemErodida[xi][yj] = 255;
                }
            }
        }
    }
    return imagemErodida;
}

export const aberturaImagem = (imagem: number[][], mascara: number[][]) => {
    let imagemParcial: number[][] = _.cloneDeep(imagem); // Cria uma cópia da imagem original
    imagemParcial = erodirImagem(imagem, mascara)
    const imagemFinal = dilatarImagem(imagemParcial, mascara)
    return imagemFinal 
}
/*
// captura uma matriz 3x3
const minimatriz = (imagem: number[][], mascara: number[][], inicio_x: number, inicio_y: number, pixelAtivo: number[]) => {
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
}*/

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
export const Operacao = (imagemOriginal: number[][]) => {
    console.log("Sem borda", imagemOriginal);
    const imagem: number[][] = adicionarBorda(imagemOriginal)
    console.log("Borda", imagem);
    return imagem
}
