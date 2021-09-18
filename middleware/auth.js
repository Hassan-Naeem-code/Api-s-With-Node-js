const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = async(request , response , next) => {
    try {
        
        console.log(request.headers['authorization'])
        const token = request.headers['authorization']
        if(!token) return response.status(400).send({ message: "invalid route" });
        // console.log(request.headers[authorization])
        const accesstoken = token.split(' ')[1]
        const a = await jwt.verify(accesstoken , "hassan")
        request.id = a.id   
        next()
    } catch (error) {
        return response.status(400).send({ message: "invalid token" });
    }
}
module.exports = jwtAuthMiddleware;