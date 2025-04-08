import { ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import User from "../models/User.js"

const createUser = async (data)=> {
    const user = await User.create(data);
    
    return user
};

const createMerchant = async (data)=>{
    await User.create({...data, roles:[ROLE_USER, ROLE_MERCHANT]});

}

export default { createUser, createMerchant };