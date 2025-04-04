const auth = (req, res, next)=>{
    console.log("Auth middleware called");

    const cookie = req.headers.cookie;
    if(!cookie) return res.status(401).send("User not authenticated!");
    
    const authToken = cookie.split("=")[1];
    console.log("Middleware",authToken);

    next();
}

export default auth;