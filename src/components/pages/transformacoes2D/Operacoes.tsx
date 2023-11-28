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

export const rotacao = (m: number[][], angulo: number) => {
    //let radianos = angulo * (Math.PI / 180);
    let cos = Math.cos(angulo);
    let sen = Math.sin(angulo);
    const base = [[cos, -sen, 0], [sen, cos, 0], [0, 0, 1]];

    const resultado = multiplicacaoOperacoes(m, base);
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}


/*export const rotacaoInversa = (m: number[][], theta: number) => {
     // Matriz de rotação inversa
     let R = [
        [Math.cos(-theta), -Math.sin(-theta)],
        [Math.sin(-theta), Math.cos(-theta)],
    [0,  0,1]] 

    const resultado = multiplicacaoOperacoes(m, R)

    return resultado  

}
*/export const rotacaoInversa = (m: number[][], theta: number) => {
     // Matriz de rotação inversa
     let R = [
        [Math.cos(2*theta),Math.sin(2*theta),0],
        [Math.sin(2*theta),  -Math.cos(2*theta),0],
        [0,  0,1],
    ]
   

    const resultado = multiplicacaoOperacoes(m, R)
    console.log(m,"trnas1",R,resultado) 
   
    return resultado 

}
export const translacao = (m: number[][], tx: number, ty: number) => {
    const base = [[1, 0, tx], [0, 1, ty], [0, 0, 1]]
    const resultado = multiplicacaoOperacoes(m, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const escala = (m: number[][], sx: number, sy: number) => {
    const base = [[sx, 0, 0], [0, sy, 0], [0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const cisalhamento = (m: number[][], shx: number, shy: number) => {
    const base = [[1, shx, 0], [shy, 1, 0], [0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}

export const reflexaoX = (m: number[][]) => {
    const base = [[1, 0, 0], [0, -1, 0], [0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    console.log(m, "refl", resultado)
    return m;
}
export const reflexaoY = (m: number[][]) => {
    const base = [[-1, 0, 0], [0, 1, 0], [0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)

    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}
export const reflexaoOrigem = (m: number[][]) => {
    const base = [[-1, 0, 0], [0, -1, 0], [0, 0, 1]]

    const resultado = multiplicacaoOperacoes(m, base)
    for (let i = 0; i < m.length; i++) {
        m[i] = resultado[i];
    }
    return m;
}