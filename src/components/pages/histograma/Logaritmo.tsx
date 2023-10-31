const Logaritmo = (matriz: number[][]): number[][] => {
    let novaMatriz: number[][] = []
   // console.log("matriz entrada", matriz)
    for (let i = 0; i < matriz?.length; i++) {
        let array: number[] = []
        for (let j = 0; j < matriz[i]?.length; j++) {
         //   console.log("elemento", Math.round(Math.log(matriz[i][j] + 1)))
            array.push(Math.round(Math.log(matriz[i][j] + 1)))
        }
        novaMatriz.push(array)
    }
   // console.log("matriz saida", novaMatriz)
    return novaMatriz
}

export default Logaritmo