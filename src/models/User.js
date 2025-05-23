import mongoose from "mongoose";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/regex.js";
import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";

const userSchema = new mongoose.Schema({
    address: {
        city:{
            type: String,
            required:true,
        },
        country:{
            type: String,
            default: "Nepal",
        },
        province:String,
        street:String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
        validate: {
            validator: (value)=>{
                return EMAIL_REGEX.test(value);
            },
            message: "Invalid email address",
        },
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        // validate: {
        //     validator: (value)=>{
        //         // if(!value) return true;
        //         return PASSWORD_REGEX.test(value);
        //     },
        //     message: "Password must contain uppercase, lowercase, special character, number",
        // },
    },
    profileImageUrl: String,
    roles: {
        type: [String],
        default: [ROLE_USER],
        enum: [ ROLE_ADMIN, ROLE_USER, ROLE_MERCHANT],
    } ,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const model = mongoose.model("User", userSchema);

export default model;