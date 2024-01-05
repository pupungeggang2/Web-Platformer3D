function vec3Add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
}

function vec3Sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]]
}

function vec3Norm(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
}

function vec3Normalize(v) {
    let norm = vec3Norm(v)
    return [v[0] / v, v[1] / v, v[2] / v]
}

function vec3Dot(v1, v2) {
    v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
}

function vec3Cross(v1, v2) {
    return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]]
}

function mat4Identity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

function mat4Mul(m1, m2) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            result[i * 4 + j] = m1[i * 4 + 0] * m2[j + 0] + m1[i * 4 + 1] * m2[j + 4] + m1[i * 4 + 2] * m2[j + 8] + m1[i * 4 + 3] * m2[j + 12]
        }
    }

    return result
}

function mat4Rotate(axis, angle) {
    let rad = angle * Math.PI / 180
    let c = Math.cos(rad)
    let s = Math.sin(rad)

    if (axis === 0) {
        return [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]
    } else if (axis === 1) {
        return [
            c, 0, s, 0,
            0, 0, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]
    }

    return [
        c, -s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

function mat4Translate(x, y, z) {
    return [
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ]
}

function mat4Scale(x, y, z) {
    return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ]
}