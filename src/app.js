import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import connectDB from "./config/database.js";
import productRoutes from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import viewRoute from "./routes/viewRoute.js";
import orderRoute from "./routes/orderRoute.js";
import logger from './middlewares/logger.js';
import connectToCloudinary from './config/cloudinary.js';
import multer from 'multer';
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

connectDB();
connectToCloudinary();

const upload = multer({
    // dest: "uploads/",
    storage: multer.memoryStorage(),
})

app.use(logger);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'hbs');

// app.get("/", (req, res)=>{
//     res.send("<h1>Home Page</h1>");
//     // res.status(401).json({message: "Hello"});
// })

app.get("/", (req, res)=>{
    res.json({
        status: "OK",
        version: "1.1.0",
        author: "Bivek Karki",
        port: port,
    })
})

// app.get("/about", (req, res)=>{
//     res.send("<h1>About Page</h1>");
// })

// app.post("/about", (req, res)=>{
//     res.send("<h1>Create data on about page</h1>");
// })

// app.get("/products", (req, res)=>{
//     res.send("<h1>Product page</h1>");
// })

// app.get("/products/:id", (req, res)=>{
//     const id = req.params.id;
//     const query = req.query;
//     console.log(query)
//     res.send(`<h1>Product by id: ${id}</h1>`);
// })



app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/users", upload.single("image"), userRoute);
app.use("/api/auth", authRoute);
app.use("/api/orders", orderRoute);
app.use("/page", viewRoute);


app.listen(port, ()=>{
    console.log(`Server started at port ${port}...`)
})










