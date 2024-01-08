function movePlayer() {
    let tempPosition = [player.position[0], player.position[1], player.position[2]]

    if (pressed['Up'] === true) {
        tempPosition[2] -= player.speed * delta / 1000
    }

    if (pressed['Left'] === true) {
        tempPosition[0] -= player.speed * delta / 1000
    }

    if (pressed['Down'] === true) {
        tempPosition[2] += player.speed * delta / 1000
    }

    if (pressed['Right'] === true) {
        tempPosition[0] += player.speed * delta / 1000
    }

    if (pressed['Jump'] === true && player.jumpLocked === false) {
        if (player.jumpNum > 0) {
            player.jumpNum -= 1
            player.jumpLocked = true
            player.ySpeed = player.jumpPower
        }
    }

    player.ySpeed += player.gravity * delta / 1000
    tempPosition[1] += player.ySpeed * delta / 1000

    if (tempPosition[1] < -0.249) {
        tempPosition[1] = -0.249
        player.ySpeed = 0
        player.jumpNum = 1
    }

    player.position = [tempPosition[0], tempPosition[1], tempPosition[2]]
}

function cameraAdjust() {
    matrixWorldRotate = mat4Rotate(0, 45)
    matrixWorldTranslate = mat4Translate(-player.position[0], 0, -player.position[2])
    matrixWorld = mat4Mul(matrixWorldTranslate, matrixWorldRotate)
}