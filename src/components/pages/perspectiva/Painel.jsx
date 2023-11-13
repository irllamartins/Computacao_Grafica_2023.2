import React, { useRef, useEffect } from 'react'



const Painel = () => {

  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("webgl");

    // verifica a compatibilidade
    if (!ctx) {
      alert("Não suportado")
      return
    }
    // Define a cor para preto totalmente opaca (sem transparência)
    ctx.clearColor(0.0, 0.0, 0.0, 1.0)
    // Limpa o buffer de cores com uma cor específica
    ctx.clear(ctx.COLOR_BUFFER_BIT)


    const vertices = [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
      -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
      -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
      1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
      -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
      -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
    ]
    const colors = [
      5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7,
      1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3,
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
      1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
    ];
    const indices = [
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
      8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
      16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
    ]

    // Cria e armazena dados no buffer de vértice
    let vertex_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);

    // Cria e armazena dados no buffer de cores
    let color_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, color_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(colors), ctx.STATIC_DRAW);


    // Cria e armazena dados no buffer de índice
    let index_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, index_buffer);
    ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), ctx.STATIC_DRAW);

    /*=================== Shaders =========================*/

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

    let mov_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    let view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    // translating z
    view_matrix[14] = view_matrix[14] - 6;//zoom

    /*==================== Rotation ====================*/

    const rotateZ = (m, angle) => {
      let c = Math.cos(angle);
      let s = Math.sin(angle);
      let mv0 = m[0], mv4 = m[4], mv8 = m[8]

      m[0] = c * m[0] - s * m[1]
      m[4] = c * m[4] - s * m[5]
      m[8] = c * m[8] - s * m[9]

      m[1] = c * m[1] + s * mv0
      m[5] = c * m[5] + s * mv4
      m[9] = c * m[9] + s * mv8
    }

    const rotateX = (m, angle) => {
      let c = Math.cos(angle);
      let s = Math.sin(angle);
      let mv1 = m[1], mv5 = m[5], mv9 = m[9];

      m[1] = m[1] * c - m[2] * s
      m[5] = m[5] * c - m[6] * s
      m[9] = m[9] * c - m[10] * s

      m[2] = m[2] * c + mv1 * s
      m[6] = m[6] * c + mv5 * s
      m[10] = m[10] * c + mv9 * s
    }

    const rotateY = (m, angle) => {
      let c = Math.cos(angle)
      let s = Math.sin(angle)
      let mv0 = m[0], mv4 = m[4], mv8 = m[8]

      m[0] = c * m[0] + s * m[2]
      m[4] = c * m[4] + s * m[6]
      m[8] = c * m[8] + s * m[10]

      m[2] = c * m[2] - s * mv0
      m[6] = c * m[6] - s * mv4
      m[10] = c * m[10] - s * mv8
    }
 /*================= Drawing ===========================*/
 let time_old = 0;

 let animate = (time) =>{

    let dt = time-time_old;
    rotateZ(mov_matrix, dt*0.005) // tempo
    rotateY(mov_matrix, dt*0.002)
    rotateX(mov_matrix, dt*0.003)
    time_old = time

    ctx.enable(ctx.DEPTH_TEST)
    ctx.depthFunc(ctx.LEQUAL)
    ctx.clearColor(0.5, 0.5, 0.5, 0.9)
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
  }, [])

  return <canvas ref={canvasRef} width={500} height={500} />
}

export default Painel