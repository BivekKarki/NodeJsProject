const auth = (req, res, next)=>{
    console.log("Auth middleware called");

    const cookie = req.headers.cookie;
    if(!cookie) return res.status(401).send("User not authenticated");
    next();
}

export default auth;