const jwt = require('jsonwebtoken')
const secretKey = process.env.TOKEN_SECRET_KEY

const auth = (req,res,next) => {
    const token = req.header('Authorization')

    if(!token) {
        return res.status(401).json({error:'no token provided'})
    }

    jwt.verify(token,secretKey,(err,decoded) => {
        if(err) {
            return res.status(401).json({error : 'Invalid token'})
        }

        req.userId = decoded.userId
        req.userName = decoded.userName
        req.email = decoded.userEmail
        next()
    })
}


module.exports = auth

