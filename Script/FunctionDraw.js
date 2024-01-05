function drawSceneInit() {
    gl.uniformMatrix4fv(currentMatrix, false, viewMatrix)
    gl.lineWidth(4)
}

function fitViewport(coord) {
    let ratio = canvasG.height / canvasG.width

    for (let i = 0; i < coord.length; i++) {
        if (i % 3 === 0) {
            coord[i] *= ratio
        }
    }

    return coord
}

function drawPlane() {

}

function drawCuboid() {

}