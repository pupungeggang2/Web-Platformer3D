function loopField() {
    if (pause === false) {
        movePlayer()
    }

    displayField()
}

function displayField() {
    drawSceneInit()
    drawSceneUIInit()

    drawObject()
}

function keyDownField(key) {
    if (pause === false) {
        if (state === '') {
            if (key === 'ArrowUp' || key === 'W' || key === 'w') {
                pressed['Up'] = true
            }

            if (key === 'ArrowLeft' || key === 'A' || key === 'a') {
                pressed['Left'] = true
            }

            if (key === 'ArrowDown' || key === 'S' || key === 's') {
                pressed['Down'] = true
            }

            if (key === 'ArrowRight' || key === 'D' || key === 'd') {
                pressed['Right'] = true
            }

            if (key === ' ') {
                pressed['Jump'] = true
            }
        }
    }
}

function keyUpField(key) {
    if (pause === false) {
        if (state === '') {
            if (key === 'ArrowUp' || key === 'W' || key === 'w') {
                pressed['Up'] = false
            }

            if (key === 'ArrowLeft' || key === 'A' || key === 'a') {
                pressed['Left'] = false
            }

            if (key === 'ArrowDown' || key === 'S' || key === 's') {
                pressed['Down'] = false
            }

            if (key === 'ArrowRight' || key === 'D' || key === 'd') {
                pressed['Right'] = false
            }

            if (key === ' ') {
                pressed['Jump'] = false
                player.jumpLocked = false
            }
        }
    }
}

function mouseUpField(x, y, button) {

}