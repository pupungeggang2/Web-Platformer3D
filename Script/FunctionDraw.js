function drawSceneInit() {
    gl.uniformMatrix4fv(currentMatrix, false, viewMatrix)
    gl.clearColor(0.2, 0.9, 0.9, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.viewport(0, 0, canvasG.width, canvasG.height)
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

function convertDataToCuboid(l, r, d, u, n, f) {
    return [[l, d, f], [r, d, f], [r, u, f], [l, u, f], [l, d, n], [r, d, n], [r, u, n], [l, u, n]]
}

function drawObject() {
    for (let i = 0; i < field.thing.length; i++) {
        drawCuboid(convertDataToCuboid(field.thing[i]['CuboidData'][0], field.thing[i]['CuboidData'][1], field.thing[i]['CuboidData'][2], field.thing[i]['CuboidData'][3], field.thing[i]['CuboidData'][4], field.thing[i]['CuboidData'][5]), [field.thing[i]['Color'][0], field.thing[i]['Color'][1], field.thing[i]['Color'][2], field.thing[i]['Color'][3]])
    }

    // Drawing Player
    drawCuboid(convertDataToCuboid(player.position[0] - player.size[0] / 2, player.position[0] + player.size[0] / 2, player.position[1] - player.size[1] / 2, player.position[1] + player.size[1] / 2, player.position[2] - player.size[2] / 2, player.position[2] + player.size[2] / 2), [1.0, 1.0, 0.5, 1.0])

    // Drawing Shadow
    drawPlane([[player.position[0] - player.size[0] / 2, -0.299, player.position[2] - player.size[2] / 2], [player.position[0] - player.size[0] / 2, -0.299, player.position[2] + player.size[2] / 2], [player.position[0] + player.size[0] / 2, -0.299, player.position[2] + player.size[2] / 2], [player.position[0] + player.size[0] / 2, -0.299, player.position[2] - player.size[2] / 2]], [0.4, 0.4, 0.4, 1])
}

function drawPlane(v, c) {
    gl.uniform4f(currentColor, c[0], c[1], c[2], c[3])
    
    for (let i = 1; i < v.length - 1; i++) {
        let tempPlane = []
        let tempVertex = [v[0][0], v[0][1], v[0][2]]
        tempPlane = tempPlane.concat(fitViewport(applyTransform(matrixWorld, tempVertex)))
        tempVertex = [v[i][0], v[i][1], v[i][2]]
        tempPlane = tempPlane.concat(fitViewport(applyTransform(matrixWorld, tempVertex)))
        tempVertex = [v[i + 1][0], v[i + 1][1], v[i + 1][2]]
        tempPlane = tempPlane.concat(fitViewport(applyTransform(matrixWorld, tempVertex)))

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempPlane), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
}

function drawCuboid(v, c) {
    let face = [[0, 2, 1], [0, 3, 2], [4, 5, 6], [4, 6, 7], [4, 1, 5], [4, 0, 1], [7, 6, 2], [7, 2, 3], [4, 3, 0], [4, 7, 3], [5, 1, 2], [5, 2, 6]]
    let edge = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
    
    gl.uniform4f(currentColor, c[0], c[1], c[2], c[3])

    for (let i = 0; i < face.length; i++) {
        let tempFace = []

        for (let j = 0; j < 3; j++) {
            let tempVertex = [v[face[i][j]][0], v[face[i][j]][1], v[face[i][j]][2]]
            tempFace = tempFace.concat(fitViewport(applyTransform(matrixWorld, tempVertex)))
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempFace), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)

    for (let i = 0; i < edge.length; i++) {
        let tempEdge = []

        for (let j = 0; j < 2; j++) {
            let tempVertex = [v[edge[i][j]][0], v[edge[i][j]][1], v[edge[i][j]][2]]
            tempEdge = tempEdge.concat(fitViewport(applyTransform(matrixWorld, tempVertex)))
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempEdge), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
        gl.drawArrays(gl.LINES, 0, 2)
    }
}