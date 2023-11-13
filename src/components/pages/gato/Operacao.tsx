type Point = [number, number]

const arnoldCatMap = (point: Point, N: number): Point => {
    let [x, y] = point;
    let xPrime = (x + y) % N;
    let yPrime = (x + 2 * y) % N;
    return [xPrime, yPrime];
}

export const arnoldCat = (matriz: number[][]): number[][] => {
    let novaMatriz: number[][] = []
    matriz.forEach((item) => novaMatriz.push(Array(matriz[0].length).fill(0)))

    for (let i = 0; i < matriz?.length; i++) {

        for (let j = 0; j < matriz[i]?.length; j++) {
            let novoPonto: Point = arnoldCatMap([i, j], matriz.length)
            novaMatriz[novoPonto[0]][novoPonto[1]] = matriz[i][j]
        }

    }
    return novaMatriz
}

export const arraysAreEqual = (array1: any[], array2: any[]): boolean => {
    return array1.length === array2.length && array1.every((item, index) => item === array2[index]);
}
