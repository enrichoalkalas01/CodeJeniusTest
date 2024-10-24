const Express = require("express")
const Routes = Express.Router()

// External Routes

// Controller
const UserController = require("../controllers/users")
// Middlewares

// Routes
Routes.post("/", UserController.createUser)
Routes.put("/:id", UserController.updateUser)
Routes.delete("/:id", UserController.deleteUser)
Routes.get("/:id", UserController.getUser)

module.exports = Routes