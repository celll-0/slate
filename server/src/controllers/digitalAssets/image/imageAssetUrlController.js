const digitalAssetService = require('../../../services/digitalAssetService.js')
const config = require('../../../config.js')

async function imageAssetUrlController(req, res){
    try {
        const { id } = req.query
        const imageUrl = await digitalAssetService.getSignedImageUrl(id)
        if(!imageUrl){
            return res.status(404).json({message: 'Image not found. Invalid image id', })
        }
        return res.status(200).json({message: 'Authorised URL generated successfully', data: { signedUrl: imageUrl   }})
    } catch(err){
        console.error(`Failed to generate signed URL due to a '${err.name}'`)
        return res.status(500).json({message: 'Failed to generate signed URL', error: err.message})
    }
}

module.exports = imageAssetUrlController