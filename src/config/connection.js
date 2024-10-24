const Mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        const Conn = await Mongoose.connect(process.env.MONGODB_URI)

        console.log(`MongoDB connected : ${ Conn.connection.host }`)
        return Conn
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = ConnectDB