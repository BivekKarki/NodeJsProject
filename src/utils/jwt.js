import jwt from 'jsonwebtoken'

const createJWT = (data)=>{
    return jwt.sign(data, "my-secret")

}

export default createJWT;