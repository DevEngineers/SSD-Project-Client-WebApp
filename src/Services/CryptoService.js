const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });


//key creating and convert to key object

// var publicKey = key.exportKey('public');
// var privateKey = key.exportKey('private');
// console.log("publicKey" + publicKey);
// console.log("privateKey" + privateKey);
// 
// let keyPublic = new NodeRSA(publicKey);
// let keyPrivate = new NodeRSA(privateKey);

let keyPublic = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' +
    'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKTF9a11mH9RXljyfWVhfyP05V8gfR3d\n' +
    'bUfO+JUEzf3ziZHddph0Kit2ysImKHIcwsg7WFXPPwFP3qrCHgXzh28CAwEAAQ==\n' +
    '-----END PUBLIC KEY-----');
let keyPrivate = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIBPAIBAAJBAKTF9a11mH9RXljyfWVhfyP05V8gfR3dbUfO+JUEzf3ziZHddph0\n' +
    'Kit2ysImKHIcwsg7WFXPPwFP3qrCHgXzh28CAwEAAQJAcagzPQE+vaPM5qHtqT7F\n' +
    'SnIkvadVZoJUXRIBGhmEVcTIORF8topszE8hWvhhOC3OSdERbyLk39mHpYGA43Mi\n' +
    'EQIhAObkqOfDItR0eNIWeWt4bZ1y1ASMqR5VtW2zDskQ56I9AiEAtrC6tBhtwV0W\n' +
    'Vdk03QwVPxdF8VQJdi1Ia/eL+NaIxxsCIQCNocv+RtPxsPSAIqsegoPy5gIqPEJt\n' +
    'SjP9c63pJoaAHQIhAJjxp7yyXuBs4BALAbi1LuxcvY9l/W3URzcsTSCL6oJVAiEA\n' +
    '3bVzDNkWCYMpMBBIDX0SNe+pwPWGYrN8JgSLW3bblT0=\n' +
    '-----END RSA PRIVATE KEY-----');


class CryptoServices {

    encryptData(data) {
        return keyPublic.encrypt(data, 'base64');
    }

    decryptData(encryptData) {
        return keyPrivate.decrypt(encryptData, 'utf8');
    }

}

export default new CryptoServices();

