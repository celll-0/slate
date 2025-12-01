const DigitalAssetFileStorage = require('../../services/digitalAssetService.js')

function assetAuthParamController(req, res){
    let token = req.query.token
    const clientAuthParams = DigitalAssetFileStorage.getClientAuthParameters(token)
    res.set({"Access-Control-Allow-Origin" : "*"})
    res.status(200).json(clientAuthParams);
}

module.exports = assetAuthParamController