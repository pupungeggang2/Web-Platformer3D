function loopField() {
    displayField()
}

function displayField() {
    drawSceneInit()
    drawSceneUIInit()

    let tempArray = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 1, 0, 1, 1, 0]

    gl.clearColor(0.2, 0.9, 0.9, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, canvasG.width, canvasG.height)

    gl.uniform4f(currentColor, 1.0, 1.0, 1.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fitViewport(tempArray)), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 3, 4, 5]), gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function keyDownField(key) {

}

function keyUpField(key) {

}

function mouseUpField(x, y, button) {

}