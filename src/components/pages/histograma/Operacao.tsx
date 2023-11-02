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
   const e:number = 2.71828
    let novaMatriz: number[][] = []
    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []
        for (let j = 0; j < matriz[i]?.length; j++) {
            let resultado = 255 * (1 / (1 + Math.pow(e,((r-w)/sigma))*-1))

            if (resultado > 255) {
                resultado = 255
            }
            if (resultado > 0) {
                resultado = 0
            }
            array.push(resultado)
        }
        novaMatriz.push(array)
    }
    return novaMatriz
}
