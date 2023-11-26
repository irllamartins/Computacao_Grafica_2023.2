// Rotação

// m = mov_matriz 
const multiplicacaoOperacoes = (operacao: number[][], resultado: number[][]): number[] => {
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
    return novoResultado.flat()
}

export const rotacaoX = (m: number[], angle: number) => {
    let cos = Math.cos(angle);
    let sen = Math.sin(angle);
    const base = [[1, 0, 0, 0], [0, cos, -sen, 0], [0, sen, cos, 0], [0, 0, 0, 1]];
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];

    const resultado = multiplicacaoOperacoes(matriz4x4, base);

    // Modificar a matriz original m
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }

    return m;
}

export const rotacaoY = (m: number[], angle: number) => {

    let cos = Math.cos(angle)
    let sen = Math.sin(angle)
    const base = [[cos, 0, sen, 0], [0, 1, 0, 0], [sen * -1, 0, cos, 0], [0, 0, 0, 1]]
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];

    const resultado = multiplicacaoOperacoes(matriz4x4, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}
export const rotacaoZ = (m: number[], angle: number) => {

    let cos = Math.cos(angle)
    let sen = Math.sin(angle)
    const base = [[cos, sen * -1, 0, 0], [sen, cos, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];

    const resultado = multiplicacaoOperacoes(matriz4x4, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}
/*export const rotateXR = (m: number[], angle: number) => {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let mv1 = m[1], mv5 = m[5], mv9 = m[9];

    m[1] = m[1] * c - m[2] * s
    m[5] = m[5] * c - m[6] * s
    m[9] = m[9] * c - m[10] * s

    m[2] = m[2] * c + mv1 * s
    m[6] = m[6] * c + mv5 * s
    m[10] = m[10] * c + mv9 * s
    return m
}
export const rotateYR = (m: number[], angle: number) => {
    let c = Math.cos(angle)
    let s = Math.sin(angle)
    let mv0 = m[0], mv4 = m[4], mv8 = m[8]

    m[0] = c * m[0] + s * m[2]
    m[4] = c * m[4] + s * m[6]
    m[8] = c * m[8] + s * m[10]

    m[2] = c * m[2] - s * mv0
    m[6] = c * m[6] - s * mv4
    m[10] = c * m[10] - s * mv8
    return m
}

export const rotateZR = (m: number[], angle: number) => {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let mv0 = m[0], mv4 = m[4], mv8 = m[8]

    m[0] = c * m[0] - s * m[1]
    m[4] = c * m[4] - s * m[5]
    m[8] = c * m[8] - s * m[9]

    m[1] = c * m[1] + s * mv0
    m[5] = c * m[5] + s * mv4
    m[9] = c * m[9] + s * mv8
    return m
}*/

export const translacao = (m: number[], tx: number, ty: number, tz: number) => {
    const base = [[1, 0, 0, tx], [0, 1, 0, ty], [0, 0, 1, tz], [0, 0, 0, 1]]
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ]

    const resultado = multiplicacaoOperacoes(matriz4x4, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}
export const escala = (m: number[], sx: number, sy: number, sz: number) => {
    const base = [[sx, 0, 0, 0,], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]]
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ]
    const resultado = multiplicacaoOperacoes(matriz4x4, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const cizalhamento = (m: number[], shx: number, shy: number) => {
    const base = [[1, 0, shx, 0,], [0, 1, shy, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
    let matriz4x4 = [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ]
    const resultado = multiplicacaoOperacoes(matriz4x4, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}