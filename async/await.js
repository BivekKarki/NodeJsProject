//technique to handle promises

import fs from 'fs/promises';

async function getAllData(){
    try {
        const users = await fs.readFile("users.json", 'utf-8');   
        console.log("Hello1")
        const posts = await fs.readFile("posts.json", 'utf-8');   
        const comments = await fs.readFile("comments.json", 'utf-8');   
        console.log("Hello2")
        console.log(users);
        console.log(posts);
        console.log(comments);
    } catch (error) {
        console.log(error)
    }
    
}

getAllData();