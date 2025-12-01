const ImageKit = require('@imagekit/nodejs')
const uuid4 = require('uuid').v4
const config = require('../config.js')

class DigitalAssetFileStorage {
    credentialExp = config.auth.assets.clientOperationExpiryTime

    constructor(){
        this.client = new ImageKit({privateKey: process.env.IMAGEKIT_PRIVATE_KEY})
    }

    generateAuthCredentials(token = null){
        token = token || uuid4();
        const exp = parseInt(Date.now()/1000) + this.credentialExp;
        return this.client.helper.getAuthenticationParameters(token, exp)
    }
    
    static djb2(s) {
        const h = 5381;
        let i = s.length;
        while (i) {
            h = (h * 33) ^ s.charCodeAt(--i);
        }
        return (h & 0xbfffffff) | ((h >>> 1) & 0x40000000);
    }
}

module.exports = DigitalAssetFileStorage