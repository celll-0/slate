const DigitalAssetFileStorage = require('../../services/digitalAssetService.js')

function assetAuthParamController(req, res){
    let fileDetails = req.body.fileDetails || {}
    const clientAuthParams = DigitalAssetFileStorage.getClientAuthParameters(fileDetails)
    res.set({"Access-Control-Allow-Origin" : "*"})
    res.status(200).json(clientAuthParams);
}

module.exports = assetAuthParamController