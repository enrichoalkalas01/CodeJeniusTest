
const Bcrypt = require("bcrypt")
const UserService = require("../services/user")
const { successHandler } = require("../utils/responseBuilder")

class UserController {
    // Fungsi ini bisa dipasang di middleware atau bisa direct di controller
    validationRequestBody = ({ req }) => {
        const validation = require("fastest-validator")
        const v = new validation()

        const schema = {
            username: { type: "string", min: 3, max: 255, optional: false },
            email: { type: "email", optional: false },
            password: { type: "string", min: 4, optional: false },
            account_number: { type: "string", min: 1, optional: false },
            identity_number: { type: "string", min: 1, optional: false },
        }

        const check = v.compile(schema)
        const result = check(req.body)

        console.log(result)
        return result
    }

    createUser = async (req, res, next) => {
        const { username, email, password, account_number, identity_number } = req.body
        try {
            const validationErrors = this.validationRequestBody({ req })
            if (validationErrors !== true) {
                throw { name: "Error", status: 400, message: "Validation failed", errors: validationErrors }
            }

            // Can do a logic first before save into db
            let DataPassing = {
                username: username,
                password: await Bcrypt.hash(password, 10), // Password Bisa Menggunakan 2 Method, yaitu yang hanya encrypted atau bisa juga ditambah yang bisa decrypt supaya bisa see password
                email: email,
                account_number: account_number,
                identity_number: identity_number,
            }

            let create = await UserService.createUser({ data: DataPassing })

            successHandler({ res: res })
        } catch (error) {
            next(error)
        }
    }

    async getUser(req, res, next) {
        try {
            // const { id } = req.params
            // const user = await userService.getUserById(id)
            // if (!user) throw { name: 'NotFoundError', message: 'User not found', status: 404 }
            // res.json(user)
            res.send('ok')
        } catch (error) {
            next(error)
        }
    }

    async getUserByAccountNumber(req, res, next) {
        try {
            // const { accountNumber } = req.params
            // const user = await userService.getUserByAccountNumber(accountNumber)
            // if (!user) throw { name: 'NotFoundError', message: 'User not found', status: 404 }
            // res.json(user)
            res.send('ok')
        } catch (error) {
            next(error)
        }
    }

    async getUserByIdentityNumber(req, res, next) {
        try {
            // const { identityNumber } = req.params
            // const user = await userService.getUserByIdentityNumber(identityNumber)
            // if (!user) throw { name: 'NotFoundError', message: 'User not found', status: 404 }
            // res.json(user)
            res.send('ok')
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req, res, next) {
        try {
            // const { id } = req.params
            // const user = await userService.updateUser(id, req.body)
            res.json({
                message: 'User updated successfully',
                // user
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        try {
            // const { id } = req.params
            // await userService.deleteUser(id)
            res.json({ message: 'User deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
