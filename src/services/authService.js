import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import ResetPassword from "../models/ResetPassword.js"
import sendEmail from '../utils/email.js';

const login = async (data)=> {
    const user = await User.findOne({
        // email: data.email
        $or: [
            {email: data.email},
            {phone: data.phone}
        ],
    });
    
    if(!user) throw new Error("User not found")

    const isPasswordMatched = bcrypt.compareSync(data.password, user.password);    

    // console.log(data.email, data.password, user);

    if(!isPasswordMatched){
        throw{
            statusCode: 400,
            message: "Incorrect Password"
        }
    }

    return user;
}

const register = async (data)=>{
    console.log("Welcome service 1")
    const user = await User.findOne({
        $or: [
            {email: data.email},
            {phone: data.phone}
        ],
    });
    console.log("Welcome service 2")

    if(user) {
        throw{
            statusCode: 409,
            message: "User already exists"
        }
    }
        


    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(data.password, salt);

     const hashedPassword = bcrypt.hashSync(data.password);

    return await User.create({
        address: data.address,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        roles: data.roles,
    });
}

const forgotPassword = async (email)=> {
    const user = await User.findOne({ email });

    if(!user) throw new Error("User not found");

    const otp = Math.floor(Math.random() * 1000000);

    await ResetPassword.create({
        userId: user?._id,
        token: otp,
    })

    // send email to user
    // {{apiUrl}}/api/auth/reset-password/:userId?token=<otp>
    await sendEmail(email, {
        subject: "Reset password link",
        body: `http://localhost:5000/api/auth/reset-password/${user._id}/?token=${otp}`
    });

    return {message:"Reset password link has been sent to your email! "}

}


const resetPassword = async (userId, token, password) => {
    const data = await ResetPassword.findOne({
        userId,
        expiresAt: { $gt: Date.now() },

    });


    // const datas = await ResetPassword.findOne({ userId, expiresAt: { $gt: Date.now() }, });
    // console.log('Step 1 - Match by userId:', datas);

    console.log(userId, token, password, data);
    
    
    if(!data || data.token !== token){
        throw{
            statusCode:400,
            message: "Invalid token.",
        }
    }

    if(data.isUsed){
        throw {
            statusCode:400,
            message: "Token already used."
        }
    }

    const hashedPassword = bcrypt.hashSync(password);
    await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
    });

    await ResetPassword.findByIdAndUpdate(data._id, {
        isUsed: true,
    })

    return {message: "Password reset syccessfully."}
}

export default {login, register, forgotPassword, resetPassword};