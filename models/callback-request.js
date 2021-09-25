let mongoose = require('mongoose')
let Schema = mongoose.Schema

let callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
})
//store in callback requests database
let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema, 'callback requests')

module.exports = { CallbackRequest }