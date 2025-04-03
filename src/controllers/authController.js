import { PASSWORD_REGEX } from '../constants/regex.js';
import { formatUserData } from '../helpers/dataFormatter.js';
import authService from '../services/authService.js';
import createJWT from '../utils/jwt.js';

const login = async (req, res)=> {
    try {

        const {email, phone, password} = req.body;

        if(!email && !phone)
            return res.status(422).send("Email or phone is required.");
       
        if(!password)
            return res.status(422).send("Password is required.");



        const data = await authService.login(req.body);
       
        const formattedData = formatUserData(data);

        const token = createJWT(formattedData);
        console.log("Token",token);

        res.cookie("userId", data._id);
        
        res.json(formattedData);
    }catch (error) {
        res.status(500).send(error.message);
    }
} 


const register = async (req, res)=> {
    try {

        const {
            address,
            email, phone, 
            password, 
            name,
            confirmPassword 
        } = req.body;

        if(!address?.city) return res.status(422).send("Address city is required");
        if(!email) return res.status(422).send("Email is required.");
        if(!phone) return res.status(422).send("Phone is required.");
        if(!name) return res.status(422).send("Name is required.");
        if(!password) return res.status(422).send("password is required.");
        if(!confirmPassword) return res.status(422).send("Comfirm Password is required.");
        if(password != confirmPassword)
            return res.status(422).send("Password is not matched")

        if(!PASSWORD_REGEX.test(password))
            return res.status(422).send("Invalid password: Password must contain uppercase lowercase character number")

        const data = await authService.register(req.body);
        

        res.json(formatUserData(data));
    }catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
} 
    
export { login, register };