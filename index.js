/**
 * Server monitor will monitor up to 5 servers about it`s availability.
 * In any case of problems, it will report to a registered user about the current problem on registered server.
 * 
 */

const http = require("http");
const url = require("url");
const StringDecoder = require('string_decoder').StringDecoder;

const PORT = process.env.SERVER_MONITOR_PORT?process.env.SERVER_MONITOR_PORT:3000; 


const server = http.createServer((request,response)=>{
    const parsedUrl = url.parse(request.url,true);
    const trimmedUrl = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    const method =  request.method.toUpperCase();
    const requestQuery = parsedUrl.query;
    const requestHeaders = request.headers;


    let buffer = '';
    let decoder = new StringDecoder('utf-8');

    request.on('data',  (data) => {
        buffer += decoder.write(data);
    });

    request.on('end', () => {
        buffer += decoder.end();
        
        console.log(`trimmedUrl ${trimmedUrl}`, "| method: ", method, "| query: ",requestQuery);
        console.log("Headers: ", requestHeaders);
        console.log("\r\n");
        console.log('Body: ', buffer);

        console.log("\r\n");
        console.log("\r\n");
    
        response.end("Hello World\n");
    
    })


    
});


server.listen(PORT,(data)=>{
    console.log("Server is listening on port: ", PORT );
});





