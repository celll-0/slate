const DigitalAssetDocStore = require('../graphicAssets/digitalAssetDocs.js')
const DigitalAssetFileStorage = require('../graphicAssets/assetStorage.js')
const uuid = require('uuid')
const config = require('../config.js')


class DigitalAssetService {
    static #assetDocStore = DigitalAssetDocStore
    static #assetFileStore = new DigitalAssetFileStorage()


    static async registerImageUpload(userId, imageDetails){
        try {
            // Set the owner id to the current user as procedure requirement
            if(!userId){
                throw new Error("User Id is required to create image")
            }
            imageDetails.ownerId = userId
            // Create the unique fileKey with uuid attached and persist image data
            const fileKey = `${uuid.v4()}-${imageDetails.name}`
            imageDetails.fileKey = fileKey
            return await this.#assetDocStore.saveImageDoc(imageDetails)
        } catch(err) {
            if(err.name === "ValidationError"){
                console.error(`Invalid property value for property '${ err.errors[ Object.keys(err.errors)[0] ].path }'`)
            }
            console.error("Failed to create asset 'image'")
            throw err
        }
    }

    static async deleteImage(userId, imageId){
        try {
            if(!userId){
                throw new Error("User Id is required to create image")
            }
            return await this.#assetDocStore.deleteImageDoc(imageId, userId)
        } catch(err) {
            console.error("Failed to delete asset 'image'")
            throw err
        }
    }

    static async updateImageDoc(userId, imageId, imageDetails){
        try {
            if(!userId){
                throw new Error("User id is required to change asset details ")
            }
            return await this.#assetDocStore.updateImageDoc(imageId, imageDetails)
        } catch(err) {
            console.log("Failed to delete asset 'image'")
            throw err
        }
    }

    static async getSignedImageUrl(imageId){
        try {
            const imageDoc = await this.#assetDocStore.getImageDocById(imageId)
            if(!imageDoc){
                throw new Error("Image not found. Invalid image id")
            }

            if(!imageDoc.url){
                try {
                    let filePath = imageDoc.filePath.startsWith('/') ? imageDoc.filePath.slice(1) : imageDoc.filePath
                    imageDoc.url = config.assets.urlEndpoint + filePath
                } catch(err){
                    if(imageDoc.ik_id){
                        imageDoc.url = `${config.assets.urlEndpoint}/${imageDoc.ik_id}`
                        console.warn("Resolved missing image URL using imageKit id")
                        return this.#assetFileStore.appendSignature(imageDoc.url).toString()
                    }
                    console.error("Could not resolve missing image URL")
                    throw new Error("Image URL is missing and could not be resolved")
                }
            }
            return this.#assetFileStore.appendSignature(imageDoc.url).toString()
        } catch(err) {
            console.error("Failed to get image URL")
            throw err
        }
    }

    static getClientAuthParameters(fileDetails = {}){
        return this.#assetFileStore.generateAuthCredentials(fileDetails)
    }
}

module.exports = DigitalAssetService