// Callback

// 1. Function used as a parameter
// Higher order function
function myFunction(myparams){

}

myFunction(function (){}) 
//myFunction jasle arko function as aparameter linxa teslai higher order function vanxa.
//function(){} yo jun chai as a parameter pass hunxa teslai chai callback function vanxa

// 2. Async task completion -> function call

import fs from 'fs';

// fs.readFile("data.txt", 'utf8', (error, data)=>{
//     if(error) console.log(error)
//         console.log(data);
// });

// callback hell

/**
 * 1. get users
 * 2. get posts of that users
 * 3. get comments of that posts
 */
fs.readFile("users.json", 'utf8', (error, data)=>{
    if(error) console.log(error)
    console.log(data);

    fs.readFile("posts.json", 'utf-8', (perror, pdata)=>{
        if(perror) console.log(perror);
        console.log(pdata);
        
        fs.readFile("comments.json", 'utf-8', (cerror, cdata)=>{
            if(cerror) console.log(cerror);
            console.log(cdata);
        })

    })
});