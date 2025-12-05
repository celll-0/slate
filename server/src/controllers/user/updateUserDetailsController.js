const UserService = require("../../services/userService.js")


async function updateUserDetailsController(req, res){
    try {
        const updatedDetails = req.body.updatedDetails
        const id = req.user._id
        // Only proceed with the update operation if the given properties are valid against user schema
        if(UserService.validator.hasProperties(Object.keys(updatedDetails))){
            // Check whether the user being updated exists
            const exists = await UserService.validator.exists_byId(id)
            if(!exists){
                return res.status(404).json({message: "Unable to find the user"})
            }
            // Perform update operation and nofify client, with db acknowledgement of reciept
            const updateRes = await UserService.updateUser(id, updatedDetails)
            res.status(200).json({message: "User details successfully updated", db_ackknowledged: updateRes.acknowledged})
        } else {
            res.status(400).json({message: "Invalid user properties"})
        }
    } catch(err) {
        console.error("Failed: Unable to update user details", err)
        res.status(500).json({message: "Failed to update user details", error: err.message})
    }
}

module.exports = updateUserDetailsController