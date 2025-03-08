import fs from 'fs';

const cbToPromise = new Promise((resolve, reject)=>{
    fs.readFile("data2.txt", 'utf-8', (error, data)=>{
        if(error) return reject(error+ " error message");
        
        resolve(data)
    })

});

cbToPromise
.then((data)=>{
    console.log(data)
})
.catch((error)=>{
    console.log(error)
})
