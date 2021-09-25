let Post = require('../models/posts').Post
let uniqid = require('uniqid')
let express = require('express')
//redirect request from one file to another
let router = express.Router()
let path = require('path')
let authMiddleware = require('../middleware/auth')


router.get('/', async (req,resp) => {
    let posts = await Post.find()
    resp.send(posts)
})

//data to be sent to update
router.get('/:id', async (req,resp) => {
    let id = req.params.id
    let post = await Post.findOne({id: id})
    resp.send(post)
})

router.post('/', authMiddleware, async (req,resp) => {
    let reqBody = req.body
    let imgPath
    if(reqBody.imageURL){
         imgPath = reqBody.imageURL
    }else{
         imgPath = req.file.path.substring(req.file.path.indexOf(path.sep),req.file.path.length)
    }
    let newPost = new Post({
       id: uniqid(),
       title: reqBody.title,
       date: new Date,
       description: reqBody.description,
       text: reqBody.text,
       country: reqBody.country,
       imageURL: imgPath //if it is empty set path to the file uploaded to images folder
    })
    //console.log(req.file)
    await newPost.save()
    resp.send('Created')
})

router.delete('/:id', authMiddleware, async (req,resp) => {
    let id = req.params.id
    await Post.deleteOne({id:id})
    resp.send('Deleted')
})

router.put('/:id', authMiddleware, async (req,resp) => {
    let id = req.params.id
    await Post.updateOne({id: id}, req.body)
    resp.send('Updated')
})

module.exports = router