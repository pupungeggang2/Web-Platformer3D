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

let pressed = {
    'Up' : false,
    'Left' : false,
    'Down' : false,
    'Right' : false,
    'Dash' : false
}

let sessionVar = {

}

let selected = {
    title : 0,
}

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

let matrixWorldRotate
let matrixWorldTranslate
let matrixWorld

// Game Variables
let fieldDisplay = {
    thing : [],
}

let camera = {
    left : -1,
    right : 1,
    down : -1,
    up : 1,
    far : -1,
    near : 100,
    translate : [0, 0, 0],
    rotate : [-45, 0, 0]
}

let field = {
    thing : [
        {'Color' : [0.5, 1.0, 0.5, 1.0], 'CuboidData' : [-0.5, 0.5, -0.5, -0.3, -0.5, 0.5]}
    ]
}

let player = {
    size : [0.1, 0.1, 0.1],
    position : [0, 0, 0],

    speed : 0.4,
    ySpeed : 0,
    jumpNum : 1,
    jumpLocked : false,
    jumpPower : 1.5,
    gravity : -3,
}