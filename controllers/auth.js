// jwt-json web token-specially generated key to 
// provide authorisation for website
let jwt = require('jsonwebtoken')
let secret = 'fjb48chr34'

function generateToken(user) {
    let payload = {
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret)
}

function checkToken(token) {
    return jwt.verify(token, secret)
}

module.exports = { generateToken, checkToken }