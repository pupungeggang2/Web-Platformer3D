window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvasG = document.getElementById('Screen')
    canvasUI = document.getElementById('UI')
    gl = canvasG.getContext('webgl')
    contextUI = canvasUI.getContext('2d')

    window.addEventListener('mouseup', mouseUp, false)
    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)

    saveInit()
    imageLoad()
    glInit()

    gameFrameCurrent = Date.now()
    gameFramePrevious = Date.now() - 16
    gameInstance = requestAnimationFrame(loop)
}

function glInit() {
    let sourceShaderVertex = `
        attribute vec4 a_position;
        uniform mat4 u_matrix;

        void main() {
            gl_Position = u_matrix * a_position;
        }
    `
    let sourceShaderFragment = `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
    `
    shaderProgram = gl.createProgram()

    shaderVertex = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shaderVertex, sourceShaderVertex)
    gl.compileShader(shaderVertex)

    shaderFragment = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shaderFragment, sourceShaderFragment)
    gl.compileShader(shaderFragment)

    gl.attachShader(shaderProgram, shaderVertex)
    gl.attachShader(shaderProgram, shaderFragment)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)

    bufferVertex = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex)
    bufferIndex = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferIndex)
    currentColor = gl.getUniformLocation(shaderProgram, 'u_color')
    currentMatrix = gl.getUniformLocation(shaderProgram, 'u_matrix')

    let coord = gl.getAttribLocation(shaderProgram, 'a_position')
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)
}

function loop() {
    gameFrameCurrent = Date.now()

    if (scene === 'Title') {
        loopTitle()
    } else if (scene === 'Field') {
        loopField()
    }

    gameFramePrevious = Date.now()
    gameInstance = requestAnimationFrame(loop)
}

function mouseUp(event) {

}

function keyDown(event) {

}

function keyUp(event) {
    
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameInstance)
    }
}

function rightClick() {
    return false
}