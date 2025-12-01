const DigitalAssetDocStore = require('../graphicAssets/digitalAssetDocs.js')
const DigitalAssetFileStorage = require('../graphicAssets/assetStorage.js')
const uuid = require('uuid')


class DigitalAssetService {
    static #assetDocStore = DigitalAssetDocStore
    static #assetFileStore = new DigitalAssetFileStorage()


    static async createImage(userId, imageDetails){
        try {
            // Set the owner id to the current user as procedure requirement
            if(!userId){
                throw new Error("User Id is required to create image")
            }
            imageDetails.ownerId = userId
            // Create the unique fileKey with uuid attached and persist image data
            const fileKey = `${uuid.v4()}-${imageDetails.fileName}`
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

    static async updateImage(userId, imageId, imageDetails){
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

    static getClientAuthParameters(token){
        return this.#assetFileStore.generateAuthCredentials(token)
    }
}

module.exports = DigitalAssetService