import express from 'express';

const app = express();

app.get("/", (req, res)=>{
    res.send("<h1>Home Page</h1>");
    // res.status(401).json({message: "Hello"});
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
    res.send(`<h1>Product by id: ${id}</h1>`);
})



app.listen(5000,()=>{
    console.log("Server started at port 5000...")
})










