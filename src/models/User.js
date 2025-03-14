import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    address: {
        city:String,
        country:String,
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
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: String,
    roles: {
        type: [String],
        default: ["USER"]
    } ,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const model = mongoose.model("User", userSchema);

export default model;