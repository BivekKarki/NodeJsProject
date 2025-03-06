import http from 'http';

const PORT = 5000;
const server = http.createServer((request, response)=>{
    console.log(request.method)
    console.log(request.url)

    response.writeHead(200, {"Content-type":"application/json"});
    
    const data = {
        port: PORT,
        version: "1.0.0",
        status: 'Running...',
    }
    // response.write("<h1>Hello World</h1>");
    response.end(JSON.stringify(data));
});

server.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
});