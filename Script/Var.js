let canvasG
let canvasUI
let gl
let contextUI

let gameInstance
let gameFrameCurrent
let gameFramePrevious
let delta

let scene = 'Title'
let state = 'Load'
let pause = false

// GL Variables
let shaderVertex
let shaderFragment
let shaderProgram
let currentColor
let currentMatrix
let viewMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, -0.5, 0,
    0, 0, 0, 1
]

let pressed = {
    'Up' : false,
    'Left' : false,
    'Down' : false,
    'Right' : false,
    'Dash' : false
}

let sessionVar = {

}

let field = {

}