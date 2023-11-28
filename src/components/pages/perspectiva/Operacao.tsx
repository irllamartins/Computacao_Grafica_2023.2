const multiplicacaoOperacoes = (operacao: number[][], resultado: number[][]): number[][] => {
    const novoResultado: number[][] = []

    for (let i = 0; i < operacao.length; i++) {
        novoResultado[i] = [];

        for (let j = 0; j < resultado[0].length; j++) {
            let soma = 0;
            for (let k = 0; k < operacao[0].length; k++) {
                soma += operacao[i][k] * resultado[j][k];
            }
            novoResultado[i].push(soma)
        }
    }
    return novoResultado
}

export const isometrico = (m: number[]) => {
    let radianos = 45 * (Math.PI / 180);
    let cos = Math.cos(radianos)
    let sen = Math.sin(radianos)
    //const base = [[1/Math.sqrt(2), -1/Math.sqrt(2), 0, 0], [1/Math.sqrt(6), 1/Math.sqrt(6), -2/Math.sqrt(6), 0], [1/Math.sqrt(3), 1/Math.sqrt(3), 1/Math.sqrt(3), 0], [0, 0, 0, 1]]
    //const base = [[Math.sqrt(2/3), Math.sqrt(1/3)*(Math.sqrt(2)/2),  Math.sqrt(1/3)*(Math.sqrt(2)/2), 0], [0, (Math.sqrt(2)/2), -(Math.sqrt(2)/2), 0], [0, 0, 0, 0], [0, 0, 0, 1]]

    const base = [
        [cos, 0, sen, 0],
        [sen * sen, cos, -sen * cos, 0],
        [-sen * cos, sen, cos * cos, 0],
        [0, 0, 0, 1]
    ]

    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];
    const resultado = multiplicacaoOperacoes(matriz4x4, base)
    const resultadoArray = resultado.flat()
    for (let i = 0; i < resultadoArray.length; i++) {
        m[i] = resultadoArray[i];
    }
    return m;
}

export const ortografica = (m: number[], lagura: number, altura: number) => {

    // const base = [ [1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 0, 0],[0, 0, 0, 1]]
    var left = 0;
    var right = lagura
    var bottom = altura
    var top = 0
    var near = 100
    var far = -10
    const base = [
        [2 / (right - left), 0, 0, 0],
        [0, 2 / (top - bottom), 0, 0],
        [0, 0, 2 / (near - far), 0],
        [(left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1,]]
    console.log(base)
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];
    const resultado = multiplicacaoOperacoes(matriz4x4, base)
    const resultadoArray = resultado.flat()
    for (let i = 0; i < resultadoArray.length; i++) {
        m[i] = resultadoArray[i];
    }
    return m;
}


export const pontoFuga = (m: number[], corteDistante: number, corteProximo: number) => {

    const base = [
        [corteDistante, 0, 0, 0],
        [0, corteDistante, 0, 0],
        [0, 0, (corteDistante + corteProximo) / ((corteProximo - corteDistante)), 2*corteProximo*corteDistante/((corteDistante-corteProximo))]
        , [0, 0, -1, 0]]
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];
    const resultado = multiplicacaoOperacoes(matriz4x4, base)
    const resultadoArray = resultado.flat()
    for (let i = 0; i < resultadoArray.length; i++) {
        m[i] = resultadoArray[i];
    }
    return m;
}


export const rotacaoY = (m: number[], angulo: number) => {
    let radianos = angulo * (Math.PI / 180);
    let cos = Math.cos(radianos)
    let sen = Math.sin(radianos)
    const base = [[cos, 0, sen, 0], [0, 1, 0, 0], [sen * -1, 0, cos, 0], [0, 0, 0, 1]]
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];

    const resultado = multiplicacaoOperacoes(matriz4x4, base)
    const resultadoArray = resultado.flat()
    for (let i = 0; i < resultadoArray.length; i++) {
        m[i] = resultadoArray[i];
    }
    return m;
}
