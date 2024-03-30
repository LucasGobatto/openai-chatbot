const http = require('http');
const server = http.createServer((req,res)=>{
    try {
        res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Hello World! ');
    } catch (error) {
        console.log(error)
    }
})
server.listen(3000);