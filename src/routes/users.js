const Express = require("express")
const Routes = Express.Router()

// External Routes

// Controller
const UserController = require("../controllers/users")
// Middlewares

// Routes
Routes.post("/", UserController.createUser)


module.exports = Routes