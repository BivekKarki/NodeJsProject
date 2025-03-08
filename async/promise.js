// resolve - success
// reject - failure

import fs from 'fs/promises';

fs.readFile('users.json', 'utf-8')
    .then((data)=>{
        console.log(data);

        return fs.readFile('posts.json', 'utf-8');
    }).then((data)=>{
        console.log(data);

        return fs.readFile('comments.json', 'utf-8');
    }).then((data)=>{
        console.log(data);
    })
    .catch((error)=>{
        console.log(error);
    });

