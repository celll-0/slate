const express = require('express')
const createImageDocController = require('../controllers/digitalAssets/image/createImageDocController.js')
const { authenticationRequired } = require('../middleware/auth.js')

const router = express.Router()

router.post('/image', authenticationRequired, createImageDocController)

module.exports = router