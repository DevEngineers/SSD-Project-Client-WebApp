const NodeRSA = require('node-rsa');
let key = new NodeRSA({ b: 512 });
key.setOptions({encryptionScheme: 'pkcs1'});
const dotenv = require('dotenv').config();

const keyPublic = new NodeRSA(process.env.PUBLIC_KEY);
const keyPrivate = new NodeRSA(process.env.PRIVATE_KEY);


class CryptoServices {

    encryptData(data) {
        return keyPublic.encrypt(data, 'base64');
    }

    decryptData(encryptData) {
        return keyPrivate.decrypt(encryptData, 'utf8');
    }

}

export default new CryptoServices();

