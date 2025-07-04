import { PASSWORD_REGEX } from '../constants/regex.js';
import { formatUserData } from '../helpers/dataFormatter.js';
import authService from '../services/authService.js';
import { createJWT, verifyJWT } from '../utils/jwt.js';

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
        // console.log("Token",token);

        res.cookie("authToken", token);
        
        res.json({...formattedData, token});
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
        console.log("Before service func...");
        const data = await authService.register(req.body);
        console.log("After service func...");
        const formattedData = formatUserData(data);

        const token = createJWT(formattedData);
        
        res.cookie("authToken", token);

        // res.json(formatUserData(data));
        res.json({...formattedData, token});
    }catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
} 

const logout = (req, res)=>{
    res.clearCookie("authToken");

    res.json({message: "Logout Successful."});
}

/**
 * 1. User forgot password
 * 2. User request for reset password in email
 * 3. User gets email
 * Email has reset psw link
 * 
 */


const forgotPassword = async (req, res)=> {
    const email = req.body.email;
    if(!email) return res.status(422).send("Email is required.")
   
    try {
        const data = await authService.forgotPassword(req.body.email)
        res.json(data);
    } catch (error) {
        res.send(error.message)
    }    
    
}

/**
 * 
 * reset-password?token=<some-token-secret> 
 *  
 */

const resetPassword = async (req, res)=> {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
  
    const token = req.query.token;
    // console.log("Tokennnnnnnnnnnnnnnnnnnn",token)
    const userId = req.params.userId;

    if(!password) return res.status(422).send("password is required.");
    if(!confirmPassword) return res.status(422).send("Comfirm Password is required.");
    if(password != confirmPassword)
        return res.status(422).send("Password is not matched")

    if(!PASSWORD_REGEX.test(password))
        return res.status(422).send("Invalid password: Password must contain uppercase lowercase character number")

    try {
        const data = await authService.resetPassword(userId, token, password);
        res.json(data);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
}
    
export { login, register, logout, forgotPassword, resetPassword };