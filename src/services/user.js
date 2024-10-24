const UserSchema = require('../models/mongodb/schema/user');
const { connectToDatabase: DynamicConnection } = require("../models/mongodb/connection")


class UserService {
    createUser = async ({ data }) => {
        // before save to db, can do modified data here before saved

        let connection = await DynamicConnection(process.env.MONGODB_URI)
        let models = await UserSchema(connection)
        // let create = await models.create(DataPassing)

        // // Check Exist Data
        const exist = models.findOne({ username: data.username })
        console.log(exist)
        // // const create = await models.create(DataPassing)
    }

    getUserById = async (id) => {
        return await User.findById(id);
    }

    getUserByAccountNumber = async (accountNumber) => {
        return await User.findOne({ accountNumber });
    }

    getUserByIdentityNumber = async (identityNumber) => {
        return await User.findOne({ identityNumber });
    }

    updateUser = async (id, data) => {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }

    deleteUser = async (id) => {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserService();
