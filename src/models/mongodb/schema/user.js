const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    userName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    identityNumber: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
{
    collection: "User",
}
)

module.exports = (conn) => conn.model('User', Schema)