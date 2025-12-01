const ImageKit = require('@imagekit/nodejs')
const config = require('../config.js')
const { generateSignedToken } = require('../utils/token.js')

class DigitalAssetFileStorage {
    credentialExp = config.auth.assets.clientOperationExpiryTime

    constructor(){
        this.client = new ImageKit({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            urlEndpoint: config.assets.urlEndpoint
        })
    }

    generateAuthCredentials(fileDetails = {}){
        const exp = parseInt(Date.now()/1000) + this.credentialExp;
        return generateSignedToken(fileDetails, process.env.IMAGEKIT_PRIVATE_KEY, {
            expiresIn: exp,
            header: {
                alg: "HS256",
                typ: "JWT",
                kid: process.env.IMAGEKIT_PUBLIC_KEY,
            }
        })
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