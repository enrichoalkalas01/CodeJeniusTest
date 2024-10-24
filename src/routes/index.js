const Express = require("express")
const Routes = Express.Router()

// External Routes
const UserRoutes = require("./users")

// Middlewares

// Routes
Routes.use("/users", UserRoutes)

module.exports = Routes