export const logaritmo = (matriz: number[][], constante: number): number[][] => {
    let novaMatriz: number[][] = []
    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []
        for (let j = 0; j < matriz[i]?.length; j++) {
            array.push(Math.round(constante * Math.log(matriz[i][j] + 1)))
        }
        novaMatriz.push(array)
    }
    return novaMatriz
}

export const linear = (matriz: number[][], a: number, b: number): number[][] => {
    let novaMatriz: number[][] = []
    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []
        for (let j = 0; j < matriz[i]?.length; j++) {
            array.push(Math.round(a * matriz[i][j] + b))
        }
        novaMatriz.push(array)
    }
    return novaMatriz
}

export const negativo = (matriz: number[][]): number[][] => {
    let novaMatriz: number[][] = []
    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []
        for (let j = 0; j < matriz[i]?.length; j++) {
            const resultado = 255 - matriz[i][j]
            array.push(resultado > 0 ? resultado : 0)
        }
        novaMatriz.push(array)
    }
    return novaMatriz
}

export const intencidadeGeral = (matriz: number[][], r: number, w: number, sigma: number): number[][] => {
    const e: number = 2.71828
    let novaMatriz: number[][] = []

    const n = matriz.flat().length

    const media = matriz.flat().reduce((a, b) => a + b) / n
    const desvioPadrao = Math.sqrt(matriz.flat().map(x => Math.pow(x - media, 2)).reduce((a, b) => a + b) / n)

    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []
        for (let j = 0; j < matriz[i]?.length; j++) {
            let x = (matriz[i][j] - media) / desvioPadrao
            let resultado = Math.round(255 * (1 / (1 + Math.pow(e, (x * -1)))))

            if (resultado > 255) {
                resultado = 255
            }
            if (resultado < 0) {
                resultado = 0
            }
            array.push(resultado)
        }
        novaMatriz.push(array)
    }
    return novaMatriz
}
export const gamma = (matriz: number[][], variavel: number, valorGama: number): number[][] => {
    let novaMatriz: number[][] = []

    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []

        for (let j = 0; j < matriz[i]?.length; j++) {
            let resultado = Math.round(variavel * Math.pow(matriz[i][j], valorGama))
            // console.log(resultado)

            if (resultado > 255) {
                resultado = 255
            }
            if (resultado < 0) {
                resultado = 0
            }
            array.push(resultado)
        }
        novaMatriz.push(array)
    }
    return novaMatriz
}

export const dinamica = (matriz: number[][], faixa: number): number[][] => {
    let novaMatriz: number[][] = []
console.log("oi")
    const minimoCinza = Math.min(...matriz.flat())
    const maximoCinza = Math.max(...matriz.flat())
    
    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []

        for (let j = 0; j < matriz[i]?.length; j++) {
            let resultado = Math.round(((matriz[i][j] - minimoCinza) / (maximoCinza - minimoCinza)) * faixa)
            // console.log(resultado)

            if (resultado > maximoCinza) {
                resultado = maximoCinza
            }
            if (resultado < minimoCinza) {
                resultado = minimoCinza
            }
            array.push(resultado)
        }
        novaMatriz.push(array)
    }
    return novaMatriz
}