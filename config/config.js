const dev = {
    ciphertext: '0bb160e96317959427616d29aab0de84',
    currentNet: '',
}
// const prod36 = {
//     ciphertext: '2f234e371fba2bb3acd3681c99600950',
//     currentNet: 'http://192.168.0.36:8084/course',
// }

const prod36 = {
    ciphertext: '2f234e371fba2bb3acd3681c99600950',
    currentNet: 'http://192.168.0.36:8084',
}

// 65ac5ac58ba4310ae080d95de7cea7b3

const prod = {
    ciphertext: '8e1586fcae9fb7a3c0488ca57a8bd611', //'95f1a701018006747e4e5734311cfa3c',
    currentNet: '',
}

const testprod = {
    ciphertext: 'a6234a71e54c20476bfcf17aed569d69', //a6234a71e54c20476bfcf17aed569d69
    currentNet: '',
}

module.exports = process.env.NODE_ENV === 'development' ? dev : prod