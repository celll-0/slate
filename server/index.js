require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { AuthRouter, UserOperationsRouter, TestAuthRouter, DigitalAssetRouter } = require('./src/routes')
require('./mongodb.js')

console.log("Starting server blehhhhhhhhhhhh...")
const PORT = 8000
const app = express()

app.use(express.json())
app.use(cors())


app.use('/users', UserOperationsRouter)

app.use('/auth', AuthRouter)

app.use('/assets', DigitalAssetRouter)

app.use('/test', TestAuthRouter)


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
