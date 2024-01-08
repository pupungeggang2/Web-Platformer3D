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

function mat4SubMat(m, index) {
    let result = []

    for (let i = 0; i < 16; i++) {
        if (i % 4 != index % 4 && Math.floor(i / 4) != Math.floor(index / 4)) {
            result.push(m[i])
        }
    }

    return result
}

function mat3Det(m) {
    return m[0] * (m[4] * m[8] - m[5] * m[7]) - m[1] * (m[3] * m[8] - m[5] * m[6]) + m[2] * (m[3] * m[7] - m[4] * m[6])
}

function mat4Inv(m) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let adj = [1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1]
    let mtr = [m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]]
    let detM = m[0] * mat3Det(mat4SubMat(m, 0)) - m[1] * mat3Det(mat4SubMat(m, 1)) + m[2] * mat3Det(mat4SubMat(m, 2)) - m[3] * mat3Det(mat4SubMat(m, 3))

    for (let i = 0; i < 16; i++) {
        result[i] = mat3Det(mat4SubMat(mtr, i)) / detM * adj[i]
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

function mat4vec4Mul(m, v) {
    return [
        m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3],
        m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3],
        m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3],
        m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]
    ]
}

function mat4View(l, r, d, u, n, f) {
    return [
        2 / (r - l), 0, 0, -(r + l) / (r - l),
        0, 2 / (u - d), 0, -(u + d) / (u - d),
        0, 0, -2 / (f - n), -(f + n) / (f - n),
        0, 0, 0, 1
    ]
}

function applyTransform(mat, vec) {
    let coordHomo = mat4vec4Mul(mat, [vec[0], vec[1], vec[2], 1])
    return [coordHomo[0] / coordHomo[3], coordHomo[1] / coordHomo[3], coordHomo[2] / coordHomo[3]]
}