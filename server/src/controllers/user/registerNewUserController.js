const UserService = require('../../services/userService.js')
const crypto = require('crypto')
const { createJWTToken } = require('../../utils/token.js')

    
async function registerNewUserController(req, res){
    try {
        const { username, email, password, dob } = req.body.userDetails
        // Check if a user exists with the same username or email, and notift if so.
        const exists = await UserService.validator.exists({email, username})
        if(exists.length > 0){
            return res.status(409).json({message: "User already exists"})
        }
        const newUser = await UserService.createNewUser({username, email, dob, password})
        // Send new user details to client (temp implementation, likely to change to necessary detail for login and such)
        res.status(200).json({
            message: "New user successfully registered",
            token: createJWTToken({
                sessionData: newUser,
            }),
            success: true
        })
    } catch(err) {
        console.error('Failed: Unable to regiester new user.\n', err)
        res.status(500).json({message: 'Failed to register new user', error: err.message})
    }
}
    
module.exports = registerNewUserController