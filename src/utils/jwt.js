import jwt from 'jsonwebtoken'

const createJWT = (data)=>{
    return jwt.sign(data, process.env.JWT_SECRET)

}

export default createJWT;