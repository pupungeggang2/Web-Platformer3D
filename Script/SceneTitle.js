function loopTitle() {
    displayTitle()
}

function displayTitle() {
    drawSceneInit()
    drawSceneUIInit()

    contextUI.fillStyle = 'White'
    contextUI.fillRect(0, 0, 1280, 720)
    contextUI.fillStyle = 'Black'

    contextUI.fillText(`Desserterria-3D`, UI.textTitle[0], UI.textTitle[1])

    contextUI.strokeRect(UI.title.buttonStart[0], UI.title.buttonStart[1], UI.title.buttonStart[2], UI.title.buttonStart[3])
    contextUI.fillText(`Start Game`, UI.title.textStart[0], UI.title.textStart[1])
    contextUI.strokeRect(UI.title.buttonErase[0], UI.title.buttonErase[1], UI.title.buttonErase[2], UI.title.buttonErase[3])
    contextUI.fillText(`Erase Data`, UI.title.textErase[0], UI.title.textErase[1])

    contextUI.drawImage(img.arrow, UI.title.arrow[selected.title][0], UI.title.arrow[selected.title][1])
}

function keyDownTitle(key) {

}

function keyUpTitle(key) {
    if (pause === false) {
        if (state === 'Load') {
            state = ''
        } else if (state === '') {
            if (key === 'ArrowUp' || key === 'w') {
                if (selected.title > 0) {
                    selected.title -= 1
                }
            } else if (key === 'ArrowDown' || key === 's') {
                if (selected.title < 1) {
                    selected.title += 1
                }
            } else if (key === 'Enter') {
                if (selected.title === 0) {
                    scene = 'Field'
                    state = ''
                    selected.title = 0
                } else if (selected.title === 1) {
                    eraseData()
                }
            }
        }
    }
}

function mouseUpTitle(x, y, button) {
    if (button === 0) {
        if (pause === false) {
            if (state === 'Load') {
                state = ''
            } else if (state === '') {
                if (pointInsideRectArray(x, y, UI.title.buttonStart)) {
                    scene = 'Field'
                    state = ''
                    selected.title = 0
                } else if (pointInsideRectArray(x, y, UI.title.buttonErase)) {
                    eraseData()
                }
            }
        }
    }
}