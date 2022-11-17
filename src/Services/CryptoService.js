const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });
const MessageService = require('../Services/MessageService')

// key creating and convert to key object

// var publicKey = key.exportKey('public');
// var privateKey = key.exportKey('private');
// console.log("publicKey" + publicKey);
// console.log("privateKey" + privateKey);

// let keyPublic = new NodeRSA(publicKey);
// let keyPrivate = new NodeRSA(privateKey);

let keyPublic = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' +
'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJAfx7hY23z5Zz9I+Ph0FWOrQERb2Z1T\n' +
'iEDtYg1vLTVkfwDQPSWvbyGCvjONA2n345uWY9oAlawq7RmxdPVos3kCAwEAAQ==\n' +
'-----END PUBLIC KEY-----');
const keyPrivate = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIBOgIBAAJBAJAfx7hY23z5Zz9I+Ph0FWOrQERb2Z1TiEDtYg1vLTVkfwDQPSWv\n' +
'byGCvjONA2n345uWY9oAlawq7RmxdPVos3kCAwEAAQJAfUjDCsNjeU4srFy44PG4\n' +
'Lj4Nzd6yWwrkJNy2IcuFVyVBkHmlKUrnnnq0Cqdg6gsGn2kPeDE+zquEAxdzWSr4\n' +
'iQIhAO3SVmSXjUaTONjyneN3C+3qi63xWW7x4wErq15hll23AiEAmyP7g8HDt4ty\n' +
'f05PQz6DYcBktE2vBQIT/+M5PcSMeE8CIQCZqnEcKjikw3fV5l5SnZddsVFzoSDy\n' +
'aOUO2pKuN0wbXQIgcLogk4hDsiZ9N8urBG10AZ9OjUS1G6p65cAxY5RhjTkCIGki\n' +
'92D2VOkxzFHIVqGVYzU40O5mQ22tNqs5govxCstu\n' +
'-----END RSA PRIVATE KEY-----');


class CryptoServices {

    //  handShake = (num) => {
    //     console.log("hands shake start" , num);
    //     var myObj = {"id":Math.random()};
    //     const encryptedValue = MessageService.postHandShake(myObj);
    //     var decryptedValue = this.decryptData(encryptedValue);
    //     console.log("decryptedValue",decryptedValue);
    //     return true;
    // }
    encryptData(data) {
        return keyPublic.encrypt(data, 'base64');
    }

    decryptData(encryptData) {
        return keyPrivate.decrypt(encryptData, 'utf8');
    }

}

export default new CryptoServices();

