const ImageKit = require('@imagekit/nodejs')
const config = require('../config.js')
const { generateSignedToken } = require('../utils/token.js')
const { encodeURLString } = require('../utils/helpers.js')
const crypto = require('node:crypto');

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

    appendSignature(url){
        let assetUrl = new URL(encodeURLString(url));
        const expiryTimestamp = parseInt(new Date().getTime() / 1000, 10) + 300;
        let str = url.replace(config.assets.urlEndpoint, "") + expiryTimestamp
        // Calcualte the signature using your priviate key 
        const signature = crypto.createHmac('sha1', process.env.IMAGEKIT_PRIVATE_KEY).update(str).digest('hex');
        // Return the url with appended params
        let urlParams = new URLSearchParams()
            urlParams.append("ik-t", expiryTimestamp)
            urlParams.append("ik-s", signature);
        assetUrl.search = urlParams.toString();
        return assetUrl
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