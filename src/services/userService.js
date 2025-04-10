import { ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import User from "../models/User.js"

const createUser = async (data)=> {
    const user = await User.create(data);
    
    return user
};

const createMerchant = async (data)=>{

    const user = await User.findOne({
        $or: [{ email: data.email }, { phone: data.phone }],
      });
    
      if (user) {
        throw {
          statusCode: 409,
          message: "User already exists.",
        };
      }
      
    const hashedPassword = bcrypt.hashSync(data.password);
    
    await User.create({
        address: data.address,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword, 
        roles:[ROLE_USER, ROLE_MERCHANT]});

}

export default { createUser, createMerchant };