// Asynchronous - Donot wait
// Synchronous - wait

import fs from "fs";

//Synchronous methods

// 1. Read
// const result = fs.readFileSync('modules/data.txt', 'utf-8');
// // console.log(result);

// const image = fs.readFileSync('logo.png', 'base64');
// // console.log(image);


// // 2. Write
// fs.writeFileSync('modules/data.txt', 'This is newly written');


// // 3. update
// fs.appendFileSync('modules/data.txt', '\nThis is appended text');

// // 4. delete
// //unlink - removes only file
// //rm - files and folder remove
// fs.rmSync('modules/data.txt')

//2. Async method

//Read
fs.readFile('data.txt', 'utf8', (error, data)=>{
    console.log(data)
});
console.log("Hello world");

//Write
fs.writeFile('data.txt', 'This is write file', ()=>{
    console.log("Data written successfully");
})

