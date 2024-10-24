const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    userName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    identityNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
}, {
    timestamps: true
})

const User = Mongoose.model('User', Schema)

module.exports = User