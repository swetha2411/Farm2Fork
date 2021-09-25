let express = require('express')
let app = express()
let mongoose = require('mongoose')
//multer for binary data
let multer = require('multer')
let postsRouter = require('./routes/posts')
let cookieParser = require('cookie-parser')
let path = require('path')
let CallbackRequest = require('./models/callback-request').CallbackRequest
let CallbackRequestRouter = require('./routes/callback-request')
let emailsRouter = require('./routes/emails')
let usersRouter = require('./routes/users')
let Post = require('./models/posts').Post
let auth = require('./controllers/auth')


//EJS TEMPLATE
app.set('view engine', 'ejs')

// let cr = new CallbackRequest({
//      id:'1234',
//      phoneNumber: '+1111111',
//      date: new Date()
// })
// cr.save()

//console.log(uniqid())

mongoose.connect('mongodb://localhost/travels')
app.use(express.json())
//saves images
let imageStorage = multer.diskStorage({
     destination: (req,file,cb) => cb(null,'public/images'),
     filename: (req,file,cb) => cb(null, file.originalname)
})
app.use(multer({storage: imageStorage}).single('imageFile'))


// let post1 = new Post({
//     id:2,
//     title:'Statue of Liberty',
//     date: new Date(),
//     description:'Some description',
//     text:'Some text',
//     country:'USA',
//     imageURL:'/images.2.jpg'
// })

// post1.save()



app.use(express.static('public'))
app.use(cookieParser())
//route path where request is made
app.use('/posts',postsRouter) 
app.use('/callback-request', CallbackRequestRouter)
app.use('/emails', emailsRouter)
app.use('/users', usersRouter)

//when get request is made, html file should be generated based on sight.ejs
app.get('/sight', async (req,resp) => {
     let id = req.query.id
     let post = await Post.findOne({id: id})
     resp.render('sight', {
          title: post.title,
          imageURL : post.imageURL,
          date: post.date ,
          text: post.text
     })
})

app.get('/admin' ,(req,resp) => {
     let token = req.cookies['auth_token']
     if(token && auth.checkToken(token)){
         resp.render('admin')
     } else{
         resp.redirect('/login')
     }
})
app.get('/login', (req,resp) => {
     resp.render('login')
})

app.listen(3000, ()=> {console.log('Listening 3000')})