// ctx: WebGLRenderingContext
export const coodernada = (x: number, y: number, ctx:any) => {
    
// Define os pontos da linha
let vertices = new Float32Array([
    0, 0,  // Primeiro ponto
     x ,y  // Segundo ponto
]);

// Cria um buffer para os dados do vértice
let buffer = ctx.createBuffer();
ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
ctx.bufferData(ctx.ARRAY_BUFFER, vertices, ctx.STATIC_DRAW);

// Define o shader de vértices
let vertexShader = ctx.createShader(ctx.VERTEX_SHADER);
ctx.shaderSource(vertexShader, `
    attribute vec2 coordinates;
    void main(void) {
        ctx_Position = vec4(coordinates, 0.0, 1.0);
    }
`);
ctx.compileShader(vertexShader);

// Define o shader de fragmentos
let fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER);
ctx.shaderSource(fragmentShader, `
    void main(void) {
        ctx_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
`);
ctx.compileShader(fragmentShader);

// Cria e vincula o programa shader
let shaderProgram = ctx.createProgram();
ctx.attachShader(shaderProgram, vertexShader);
ctx.attachShader(shaderProgram, fragmentShader);
ctx.linkProgram(shaderProgram);
ctx.useProgram(shaderProgram);

// Vincula os dados do vértice ao programa shader
let coordinates = ctx.getAttribLocation(shaderProgram, 'coordinates');
ctx.vertexAttribPointer(coordinates, 2, ctx.FLOAT, false, 0, 0);
ctx.enableVertexAttribArray(coordinates);

// Desenha a linha
// ctx.clearColor(1.0, 1.0, 1.0, 1.0);
//ctx.clear(ctx.COLOR_BUFFER_BIT);
ctx.drawArrays(ctx.LINES, 0, vertices.length / 2);

}