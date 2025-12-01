const express = require('express')
const { loginAuthController, logoutAuthController, assetAuthParamController } = require('../controllers/auth')
const { authenticationRequired } = require('../middleware/auth.js')

const router = express.Router()

router.post('/login', loginAuthController)

router.post('/logout', authenticationRequired, logoutAuthController)

router.get('/assets/auth-params', authenticationRequired, assetAuthParamController)

module.exports = router

