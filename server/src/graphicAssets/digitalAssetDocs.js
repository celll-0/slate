const { Image } = require('./models/image.js')


class DigitalAssetDocStore {
    static async saveImageDoc(imageDetails){
        try {
            const image = new Image({ 
                ownerId: imageDetails.ownerId,
                ik_id: imageDetails.fileId,
                name: imageDetails.name,
                fileSize: imageDetails.fileSize,
                fileKey: imageDetails.fileKey,
                filePath: imageDetails.filePath,
                fileType: imageDetails.fileExtension,
                url: imageDetails.url,
                dimensions: {
                    height: imageDetails.height,
                    width: imageDetails.width
                },
                orientation: imageDetails.orientation,
                thumbnailUrl: imageDetails.thumbnailUrl,
            })
            return await image.save()
        } catch(err) {
            const msg = this.#resolveAssetOperationErrorMessage(err)
            console.error(msg)
            throw err
        }
    }

    static async updateImageDoc(id, newImageDetails){
        try {
            const image = await Image.findOne({_id: id})
            if((typeof image.ownerId === 'object' || typeof image.ownerId === 'string') && image.ownerId != userId){
                throw new Error("requesting user id must match the owner id")
            }
            
            for(const key in newImageDetails){
                if(!Object.hasOwn(image, key)){
                    throw new Error("Invalid Image property")
                }
                image[key] = newImageDetails[key]
            }
            return await image.save()
        } catch(err) {
            const msg = this.#resolveAssetOperationErrorMessage(err)
            console.error(msg)
            throw err
        }
    }

    static async deleteImageDoc(id, userId){
        try {
            const image = await Image.findOne({_id: id})
            if((typeof image.ownerId === 'object' || typeof image.ownerId === 'string') && image.ownerId != userId){
                throw new Error("requesting user id must match the owner id")
            }
            return await Image.deleteOne({_id: id})
        } catch(err){
            const msg = this.#resolveAssetOperationErrorMessage(err)
            console.error(msg)
            throw err
        }
    }

    static #resolveAssetOperationErrorMessage(err){
        if(err.name === "ValidationError"){
            return "Validation failed during doc operation"
        } else {
            return "Image asset document failed to save to db"
        }
    }
}

module.exports = DigitalAssetDocStore