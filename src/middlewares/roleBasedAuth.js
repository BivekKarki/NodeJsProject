const roleBasedAuth = (role)=> { 
    return (req, res, next)=>{

        console.log("User role is ... ",role);

        const user = req.user;
        if(user.roles.includes(role)) return next();

        res.status(403).send("Access denied.");

    }
}

export default roleBasedAuth;