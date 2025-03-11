import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/database.js"

const port = process.env.PORT || 5000;
const app = express();

dotenv.config();

connectDB();

// app.get("/", (req, res)=>{
//     res.send("<h1>Home Page</h1>");
//     // res.status(401).json({message: "Hello"});
// })

app.get("/", (req, res)=>{
    res.json({
        status: "OK",
        version: "1.0.0",
        port: port,
    })
})

app.get("/about", (req, res)=>{
    res.send("<h1>About Page</h1>");
})

app.post("/about", (req, res)=>{
    res.send("<h1>Create data on about page</h1>");
})

app.get("/products", (req, res)=>{
    res.send("<h1>Product page</h1>");
})

app.get("/products/:id", (req, res)=>{
    const id = req.params.id;
    const query = req.query;
    console.log(query)
    res.send(`<h1>Product by id: ${id}</h1>`);
})



app.listen(port,()=>{
    console.log(`Server started at port ${port}...`)
})










