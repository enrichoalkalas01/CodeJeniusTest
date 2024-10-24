const UserSchema = require('../models/UserSchema')
const Bcrypt = require("bcrypt")

class UserService {
    createUser = async ({ data }) => {
        try {
            let DataPassing = {
                userName: data.username,
                accountNumber: data.account_number,
                emailAddress: data.email,
                identityNumber: data.identity_number,
                password: await Bcrypt.hash(data.password, 10),
            }
    
            let checkExist = await UserSchema.findOne({ username: data.username })
            if (checkExist) {
                return {
                    status: false,
                    message: 'User already exists!',
                    error: {
                        name: 'Error',
                        status: 400,
                        message: 'User already exists!',
                    },
                }
            }
    
            let create = await UserSchema.create(DataPassing)
            return { status: true, data: create, message: 'User created successfully!' }
        } catch (error) {
            return {
                status: false,
                message: 'Failed to create user!',
                error: {
                    name: 'Error',
                    status: error.status,
                    message: error.message || 'Internal Server Error',
                },
            }
        }
    }

    updateUser = async ({ id, data }) => {
        try {
            let DataPassing = {
                userName: data.username,
                accountNumber: data.account_number,
                emailAddress: data.email,
                identityNumber: data.identity_number,
                password: await Bcrypt.hash(data.password, 10),
            }
    
            let checkExist = await UserSchema.findOne({ _id: id })
            if (!checkExist) {
                return {
                    status: false,
                    message: 'User is not exists!',
                    error: {
                        name: 'Error',
                        status: 400,
                        message: 'User is not exists!',
                    },
                }
            }
    
            let update = await UserSchema.updateOne(
                { _id: id },
                { ...DataPassing },
            )

            if (update.nModified === 0) {
                console.log('Tidak ada data yang diupdate!')
                return {
                    name: 'Error',
                    status: 400,
                    message: 'Tidak ada perubahan data!'
                }
            }

            return { status: true, data: update, message: 'User updated successfully!' }
        } catch (error) {
            return {
                status: false,
                message: 'Failed to update user!',
                error: {
                    name: 'Error',
                    status: error.status,
                    message: error.message || 'Internal Server Error',
                },
            }
        }
    }

    deleteUser = async ({ id }) => {
        try {
            let checkExist = await UserSchema.findOne({ _id: id })
            if (!checkExist) {
                return {
                    status: false,
                    message: 'User is not exists!',
                    error: {
                        name: 'Error',
                        status: 400,
                        message: 'User is not exists!',
                    },
                }
            }

            let deleteUser = await UserSchema.deleteOne({ _id: id })

            return { status: true, data: deleteUser, message: 'User deleted successfully!' }
        } catch (error) {
            return {
                status: false,
                message: 'Failed to update user!',
                error: {
                    name: 'Error',
                    status: error.status,
                    message: error.message || 'Internal Server Error',
                },
            }
        }
    }

    getUserById = async ({ id }) => {
        try {
            let checkExist = await UserSchema.findOne({ _id: id })
            if (!checkExist) {
                return {
                    status: false,
                    message: 'User is not exists!',
                    error: {
                        name: 'Error',
                        status: 400,
                        message: 'User is not exists!',
                    },
                }
            }

            return { status: true, data: checkExist, message: 'User geted successfully!' }
        } catch (error) {
            return {
                status: false,
                message: 'Failed to update user!',
                error: {
                    name: 'Error',
                    status: error.status,
                    message: error.message || 'Internal Server Error',
                },
            }
        }
    }
}

module.exports = new UserService()
