import mongoose from "mongoose";


async function connectDB() {
    // database connection code
    try {
        const status = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${status.connection.host}`);
    } catch (error) {
        console.log(`DB error ${error.message}`);
        process.exit(1);
    }

}

export default connectDB;