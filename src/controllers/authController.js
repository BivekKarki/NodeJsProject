import authService from '../services/authService.js';

const login = async (req, res)=> {
    try {

        const {email, phone, password} = req.body;

        if(!email && !phone)
            return res.status(422).send("Email or phone is required.");
       
        if(!password)
            return res.status(422).send("Password is required.");



        const data = await authService.login(req.body);
        res.cookie("userId", data._id);
        
        res.json(data);
    }catch (error) {
        res.status(500).send(error.message);
    }
} 


const register = async (req, res)=> {
    try {
        const data = await authService.register(req.body);
        console.log("Hellooooooooooo",data);
        res.json(data);
    }catch (error) {
        res.status(500).send(error.message);
    }
} 
    
export { login, register };