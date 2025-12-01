const DigitalAssetService = require('../../../services/digitalAssetService.js')
const digitalAssetService = require('../../../services/digitalAssetService.js')
const config = require('../../../config.js')


// TODO: Add a method to create a fileKey and add to fileDetails before 'createImage'.
async function createImageDocController(req, res){
    try {
        const fileDetails = req.body.fileDetails
        if(fileDetails.mimetype.contains('image')){
            const accepted = false;
            for(const type of config.assets.acceptedImageTypes){
                if(fileDetails.mimetype.contains(type) && fileDetails.type === type){
                    accepted = true;
                }
            }
            if(!accepted){
                res.status(415).json({message: 'Image is not of an accepted type'})
            }
        } else {
            res.status(415).json({message: 'Invalid asset type'})
        }

        const userId = req.user._id
        const newImage = await DigitalAssetService.registerImageUpload(userId, fileDetails)
        res.status(201).json({message: 'Image created successfully', data: newImage})
    } catch(err){
        console.error(`Image upload failed due to a '${err.name}'`)
        res.status(500).json({message: 'Failed to upload image', error: err.message})
    }
}

module.exports = createImageDocController