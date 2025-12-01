const DigitalAssetFileStorage = require('../../graphicAssets/assetStorage.js')

function assetAuthParamController(req, res){
    let token = req.query.token
    const digitalAssetStorage = new DigitalAssetFileStorage()
    const clientAuthParams = digitalAssetStorage.generateAuthCredentials(token)

    res.set({"Access-Control-Allow-Origin" : "*"})
    res.status(200).json(clientAuthParams);
}

module.exports = assetAuthParamController