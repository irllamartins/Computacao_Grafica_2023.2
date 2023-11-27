// Rotação

// m = mov_matriz 
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

export const rotacaoX = (m: number[][], angulo: number) => {
    let radianos = angulo * (Math.PI / 180);
    let cos = Math.cos(radianos);
    let sen = Math.sin(radianos);
    const base = [[1, 0, 0, 0], [0, cos, -sen, 0], [0, sen, cos, 0], [0, 0, 0, 1]];

    const resultado = multiplicacaoOperacoes(m, base);
    console.log("rotX", resultado)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const rotacaoY = (m: number[][], angulo: number) => {
    let radianos = angulo * (Math.PI / 180);
    let cos = Math.cos(radianos)
    let sen = Math.sin(radianos)
    const base = [[cos, 0, sen, 0], [0, 1, 0, 0], [sen * -1, 0, cos, 0], [0, 0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}
export const rotacaoZ = (m: number[][], angulo: number) => {
    let radianos = angulo * (Math.PI / 180);
    let cos = Math.cos(radianos)
    let sen = Math.sin(radianos)
    const base = [[cos, sen * -1, 0, 0], [sen, cos, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const translacao = (m: number[][], tx: number, ty: number, tz: number) => {
    const base = [[1, 0, 0, tx], [0, 1, 0, ty], [0, 0, 1, tz], [0, 0, 0, 1]]
    const resultado = multiplicacaoOperacoes(m, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const escala = (m: number[][], sx: number, sy: number, sz: number) => {
    const base = [[sx, 0, 0, 0,], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const cisalhamento = (m: number[][], shx: number, shy: number) => {
    const base = [[1, 0, shx, 0,], [0, 1, shy, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const reflexaoXY = (m: number[][]) => {
    const base = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]]
    
    const resultado = multiplicacaoOperacoes(m, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    console.log(m,"refl",resultado)
    return m;
}
export const reflexaoYZ = (m: number[][]) => {
    const base = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)
    
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}
export const reflexaoXZ = (m: number[][]) => {
    const base = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
 
    const resultado = multiplicacaoOperacoes(m, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}