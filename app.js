// HTTP module - server create
import http from "http";


const PORT = 5000
//Request - User send/requests to server
//Response - Server sends to User
const app = http.createServer((request, response)=>{
    response.writeHead(200, {'content-type': 'text/html'})
    if(request.url == '/'){
        return response.end("<h1>Home Page</h1>");
    }else if(request.url == "/about"){
        return response.end("<h1>About Page</h1>")
    }else if(request.url == '/posts'){
        if(request.method == 'POST'){
            return response.end("<h1>Create post</h1>")
        }else if(request.method == "PUT"){
            return response.end("<h1>Update post</h1>")
        }
        return response.end("<h1>Posts page</h1>")
    }else{
        return response.end("<h1>404 page not found</h1>")
    }
    
})
app.listen(PORT, ()=>{
    console.log("Server running at prt 5000...")
});