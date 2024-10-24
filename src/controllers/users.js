
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

        return result
    }

    createUser = async (req, res, next) => {
        try {
            const validationErrors = this.validationRequestBody({ req })
            if (validationErrors !== true) {
                throw { name: "Error", status: 400, message: "Validation failed", errors: validationErrors }
            }

            let create = await UserService.createUser({ data: req.body })
            if ( !create.status ) {
                throw {
                    name: create.error.name, status: create.error.status,
                    message: create.error.message,
                }
            }

            successHandler({ res: res, message: create.message })
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const validationErrors = this.validationRequestBody({ req })
            if (validationErrors !== true) {
                throw { name: "Error", status: 400, message: "Validation failed", errors: validationErrors }
            }

            let update = await UserService.updateUser({ data: req.body, id: req.params.id })
            if ( !update.status ) {
                throw {
                    name: update.error.name, status: update.error.status,
                    message: update.error.message,
                }
            }

            successHandler({ res: res, message: update.message })
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            let deleteUser = await UserService.deleteUser({ id: req.params.id })
            if ( !deleteUser.status ) {
                throw {
                    name: deleteUser.error.name, status: deleteUser.error.status,
                    message: deleteUser.error.message,
                }
            }

            successHandler({ res: res, message: deleteUser.message })
        } catch (error) {
            next(error)
        }
    }

    getUser = async (req, res, next) => {
        try {
            let getUser = await UserService.getUser({ id: req.params.id })
            if ( !getUser.status ) {
                throw {
                    name: getUser.error.name, status: getUser.error.status,
                    message: getUser.error.message,
                }
            }

            successHandler({ res: res, message: getUser.message })
        } catch (error) {
            next(error)
        }
    }

    getAllUser = async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
