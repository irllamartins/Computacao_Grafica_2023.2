const criarEscala = ( escala:number) =>{
    let cores = Array(escala+1).fill(0)
    return cores;
}


export const Frequencia = (matriz: number[][], escala: number): number[] => {
    let cores: number[] = criarEscala(escala)
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
          cores[Math.round(matriz[i][j])]++;
        }
    }
    return cores
}

export default Frequencia