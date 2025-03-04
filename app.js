// HTTP module - server create
import http from "http";

//Request - User send/requests to server
//Response - Server sends to User
const app = http.createServer((request, response)=>{
    response.end("Hello ram");
})
app.listen(5000, ()=>{
    console.log("Server running at prt 5000...")
});