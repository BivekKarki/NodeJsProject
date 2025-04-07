import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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

    const user = await User.findOne({
        $or: [
            {email: data.email},
            {phone: data.phone}
        ],
    });

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

export default {login, register};