const Express = require("express")
const App = Express()
const Dotenv = require("dotenv")
const Helmet = require('helmet')
const CookieParser = require('cookie-parser')
const Morgan = require("morgan")
const Path = require("path")

// Libs
const cors = require("./src/libs/cors")
const session = require("./src/libs/session")
const HealthCheck = require("./src/libs/health-check")

// Config Server
Dotenv.config({ path: Path.join(__dirname, "./.env") })
const HOST = "0.0.0.0"
const PORT = process.env.PORT || 5500

// Setup Server
App.use(cors)
App.use(Helmet())
App.use(Express.json())
App.use(Express.urlencoded({ extended: false }))
App.use(Express.static('public'))
App.use(CookieParser())
App.use(Morgan("dev"))
App.use(session)

// Connection DB
const MongoDBConnection = require("./src/config/connection")
let connectionDB = MongoDBConnection()

// Running Server
const Server = App.listen(PORT, HOST, () => console.log(`Server is running in port : ${ PORT }`))

// Routes
const Routes = require("./src/routes")
const BaseURL = "/api/v1"
const healthCheck = new HealthCheck({ startTime: Date.now() })

App.use(BaseURL, Routes)
App.use(`${BaseURL}/health-check`, healthCheck.getHealthCheck()) // Health Check API

// 404 Handler
App.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error Handler
const { errorHandler } = require("./src/middlewares/errorHandlers")
App.use(errorHandler)

module.exports = { Server, App }