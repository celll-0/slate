const express = require('express')
const { imageCreateDocController, imageAssetUrlController } = require('../controllers/digitalAssets/')
const { authenticationRequired } = require('../middleware/auth.js')
const { auth } = require('../config.js')

const router = express.Router()

router.post('/image', authenticationRequired, imageCreateDocController)

router.get('/image/:id', authenticationRequired, imageAssetUrlController)

module.exports = router