import { verifyJWT } from "../utils/jwt.js";

const auth = (req, res, next)=>{
    console.log("Auth middleware called");

    const cookie = req.headers.cookie;
    if(!cookie) return res.status(401).send("User not authenticated!");
    
    const authToken = cookie.split("=")[1];
    
    verifyJWT(authToken)
    .then((data)=>{
        req.user = data;

        next();
    })
    .catch(()=>{
        res.status(400).send("Invalid token")
    });
    
    console.log("Middleware",authToken);

    next();
}

export default auth;