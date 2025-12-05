const DigitalAssetFileStorage = require('../../services/digitalAssetService.js')

function assetAuthParamController(req, res){
    let fileDetails = req.body.fileDetails || {};
    const token = req.body.token;
    const clientAuthParams = DigitalAssetFileStorage.getClientAuthParameters(token, fileDetails)
    res.set({"Access-Control-Allow-Origin" : "*"})
    res.status(200).json({token: clientAuthParams});
}

module.exports = assetAuthParamController