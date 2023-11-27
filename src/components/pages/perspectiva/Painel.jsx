import React, { useRef, useEffect } from 'react'

const Painel = ({ vertices, cores, indices, mov_matrix ,view_matrix}) => {

  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("webgl");

   // coodernada(500,500,canvas)
    // verifica a compatibilidade
    if (!ctx) {
      alert("Não suportado")
      return
    }
    // Define a cor do fundo (R, G, B, A=1.0)
    ctx.clearColor(0.0, 0.0, 0.0, 1.0)

    // Limpa o buffer de cores com uma cor específica
    ctx.clear(ctx.COLOR_BUFFER_BIT)

    // Cria e armazena dados no buffer de vértice
    let vertex_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);

    // Cria e armazena dados no buffer de cores
    let color_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, color_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(cores), ctx.STATIC_DRAW);


    // Cria e armazena dados no buffer de índice
    let index_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, index_buffer);
    ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), ctx.STATIC_DRAW);
    
    /*=================== Shaders =========================*/
    
    // os shaders (programas de sombreamento) 
    let vertCode = 'attribute vec3 position;' +
      'uniform mat4 Pmatrix;' +
      'uniform mat4 Vmatrix;' +
      'uniform mat4 Mmatrix;' +
      'attribute vec3 color;' +///a cor do ponto
      'varying vec3 vColor;' +

      'void main(void) { ' +//função pré-construída
      'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
      'vColor = color;' +
      '}'

    let fragCode = 'precision mediump float;' +
      'varying vec3 vColor;' +
      'void main(void) {' +
      'gl_FragColor = vec4(vColor, 1.);' +
      '}'

    let vertShader = ctx.createShader(ctx.VERTEX_SHADER);
    ctx.shaderSource(vertShader, vertCode);
    ctx.compileShader(vertShader);

    let fragShader = ctx.createShader(ctx.FRAGMENT_SHADER);
    ctx.shaderSource(fragShader, fragCode);
    ctx.compileShader(fragShader);

    let shaderProgram = ctx.createProgram();
    ctx.attachShader(shaderProgram, vertShader);
    ctx.attachShader(shaderProgram, fragShader);
    ctx.linkProgram(shaderProgram);

    /* ====== Associating attributes to vertex shader =====*/
    let Pmatrix = ctx.getUniformLocation(shaderProgram, "Pmatrix");
    let Vmatrix = ctx.getUniformLocation(shaderProgram, "Vmatrix");
    let Mmatrix = ctx.getUniformLocation(shaderProgram, "Mmatrix");
  

    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer);
    var position = ctx.getAttribLocation(shaderProgram, "position");
    ctx.vertexAttribPointer(position, 3, ctx.FLOAT, false, 0, 0);
   
    // Position
    ctx.enableVertexAttribArray(position);
    ctx.bindBuffer(ctx.ARRAY_BUFFER, color_buffer);
    var color = ctx.getAttribLocation(shaderProgram, "color");
    ctx.vertexAttribPointer(color, 3, ctx.FLOAT, false, 0, 0);
    
    // Color
    ctx.enableVertexAttribArray(color);
    ctx.useProgram(shaderProgram);

    /*==================== MATRIX =====================*/

    const get_projection = (angle, a, zMin, zMax) => {
      let ang = Math.tan((angle * .5) * Math.PI / 180);//angle*.5
      return [
        0.5 / ang, 0, 0, 0,
        0, 0.5 * a / ang, 0, 0,
        0, 0, -(zMax + zMin) / (zMax - zMin), -1,
        0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
      ];
    }
    let proj_matrix = get_projection(40, canvas.width / canvas.height, 1, 100);

    // translating z
    view_matrix[14] = view_matrix[14] - 6;//zoom

    /*================= Drawing ===========================*/

    let animate = (time) => {

      ctx.enable(ctx.DEPTH_TEST)
      ctx.depthFunc(ctx.LEQUAL)
      ctx.clearDepth(1.0)

      ctx.viewport(0.0, 0.0, canvas.width, canvas.height)
      ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT)
      ctx.uniformMatrix4fv(Pmatrix, false, proj_matrix)
      ctx.uniformMatrix4fv(Vmatrix, false, view_matrix)
      ctx.uniformMatrix4fv(Mmatrix, false, mov_matrix)
      ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, index_buffer)
      ctx.drawElements(ctx.TRIANGLES, indices.length, ctx.UNSIGNED_SHORT, 0)

      window.requestAnimationFrame(animate)
    }
    animate(0)
  }, [vertices, cores, indices, mov_matrix ,view_matrix])

  return <canvas ref={canvasRef} width={1000} height={500} />
}

export default Painel