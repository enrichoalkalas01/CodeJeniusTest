const HealthCheck = require("express-healthcheck")

const DatabaseMongoDB = require('../models/mongodb/connection')

class HealthCheckService {
    constructor({ startTime }) {
        this.startTime = startTime
        
        this.version = "0.1.0"
        this.healthyStatus = true
        this.databaseStatus = true
    }

    formatUptime(uptimeInSeconds) {
        const hours = Math.floor(uptimeInSeconds / 3600)
        const minutes = Math.floor((uptimeInSeconds % 3600) / 60)
        const seconds = Math.floor(uptimeInSeconds % 60)

        return `${hours}h ${minutes}m ${seconds}s`
    }

    async getConnectionDatabase() {
        const Mongodb = new DatabaseMongoDB("asd")
        const connection = await Mongodb.connect()
        console.log(connection)
        if ( connection ) console.log(true)
        // let connection = await connectToDatabase(process.env.MONGODB_URI)
        // console.log(connection)
    }

    getHealthStatus() {
        const uptimeInSeconds = Math.floor((Date.now() - this.startTime) / 1000)
        const uptimeFormatted = this.formatUptime(uptimeInSeconds)

        return {
            healthy: this.healthyStatus,
            database: this.databaseStatus,
            uptime: process.uptime(),
            uptimeFormatted: uptimeFormatted,
            version: this.version,
        }
    }

    getHealthCheck() {
        return HealthCheck({
            healthy: () => this.getHealthStatus(),
        })
    }
}

module.exports = HealthCheckService
