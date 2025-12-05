const { User } = require('../users/model.js');
const { UserValidation } = require('../users/validation.js');
const crypto = require('node:crypto');
 
class UserService {
    static validator = UserValidation;

    static async getUserById(userId) {
        const user = await User.findById(userId);
        return user;
    }

    static async getAllUsers() {
        const users = await User.find();
        return users;
    }

    static async createNewUser(userData) {
        // Generate password hash with 'sha256' protocol and persist new user
        const passwordHash = crypto.createHash('sha256').update(userData.password).digest('hex');
        const newUser = new User({...userData, password: passwordHash});
        await newUser.save()
            .catch((err) => {throw err})
        return newUser;
    }

    static async deleteUserById(user) {
        let acknowledged = await user.deleteOne()
        return acknowledged;
    }

    static async updateUser(userId, updatedDetails) {
        const update = await User.updateOne({_id: userId}, updatedDetails);
        return update;
    }
}

module.exports = UserService;