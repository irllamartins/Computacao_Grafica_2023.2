const criarEscala = ( escala:number) =>{
    let cores = Array(escala+1).fill(0)
    return cores;
}


export const frequencia = (matriz: number[][], escala: number): number[] => {
    let cores: number[] = criarEscala(escala)
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
          cores[Math.round(matriz[i][j])]++;
        }
    }
    return cores
}

const acumulado = (cores: number[]) => {
    let resultado =[]
    resultado.push(cores[0])
    for (let i = 1; i < cores.length; i++) {
        resultado.push(resultado[i - 1] + cores[i])

    }
    return resultado
}

const mapearCores = (pixels: number, cores: number[], escala: number) => {
    let mapaCores: number[] = []
    let resultadoAcumulado: number[] =  acumulado(cores)
    const quantidadePixelDaImg = pixels

    let menor = 0;
    for (let i = 1; i < cores.length; i++) {
        if (cores[i] !=0) {
            menor = cores[i];
            i=cores.length;
        }
    }

    for (let i = 1; i < cores.length; i++) {
        mapaCores.push(Math.round((resultadoAcumulado[i] - menor)* escala) / (quantidadePixelDaImg - menor)) 
    }
    return mapaCores
}

const equalizacao = ( matriz:number[][], escala:number) => {
    const histograma = frequencia(matriz, escala);
    const mapaDeCores = mapearCores(matriz.length * matriz[0].length, histograma, escala)

    let matrizTransfomada = []
    for (let  y = 0; y < matriz.length ; y++) {
        let array = []    
        for (let x = 0; x < matriz[0].length; x++) {
            array.push(mapaDeCores[matriz[y][x]])
        }
        matrizTransfomada.push(array)
    }
    return {matriz:matrizTransfomada,frequencia:histograma}
}
export default equalizacao