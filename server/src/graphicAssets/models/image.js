const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    ik_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fileKey: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true
    },
    filePath: {
        type: String,
        required: true,
        trim: true
    },
    fileType: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    dimensions: {
        height: {
            type: Number,
            required: true,
            min: 1
        },
        width: {
            type: Number,
            required: true,
            min: 1
        },
        type: Object,
        required: true
    },
    orientation: {
        type: Number,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: false,
        trim: true
    }
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = { Image, ImageSchema }