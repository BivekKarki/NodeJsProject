const roleBasedAuth = (role)=> { 
    return (req, res, next)=>{
        const user = req.user;

        console.log("User role is ... ",role, "/n send role is ... ", user.roles);

        // console.log(user);
        if(user.roles.includes(role)) return next();

        res.status(403).send("Access denied.");

    }
}

export default roleBasedAuth;