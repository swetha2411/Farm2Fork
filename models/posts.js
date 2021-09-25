let mongoose = require('mongoose')
let Schema = mongoose.Schema
//schema 
//MONGOOSE ADD ID AUTOMATICALLY
let postSchema = new Schema({
    id:String,
    title:String,
    date:Date,
    description:String,
    text:String,
    country:String,
    imageURL:String
})
//class for schema
let Post = mongoose.model('Post',postSchema)

module.exports={ Post }