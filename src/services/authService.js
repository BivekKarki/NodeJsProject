import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const login = async (data)=> {
    const user = await User.findOne({
        email: data.email,
    });
    
    if(!user) throw new Error("User not found")

    return user;
}

const register = async (data)=>{

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