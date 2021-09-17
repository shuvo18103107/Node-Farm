//import file system module
const fs = require('fs');
const http = require('http');
const url = require('url');
//................ Files..................
//reading and writing files in sync way (blocking)
// //read a file 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// //write a file 
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written!');

//Non-blocking async way
/*

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

    if (err) return console.log('💥Error');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        // console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            // console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('file written');
            })
        })
    })
})
*/
//..................................Server....................
// to make a server 
//1. to create a server then start a server 
//createserver has a callback function which is fired of each time server has a request
const server = http.createServer((req, res) => {
    // console.log(req);//get request object in terminal
    console.log(req.url);
    //routing has no relation in file like if we write in browser /any file name that will not open any file in browser for this we have need another special technique
    //url module parse the parameter value into a nicely formatted object
    //implementing routing 
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('Hello from the Overview!')

    }
    else if (pathName === '/product') {
        res.end('Hello from the Product Page!')

    }
    else {
        //for showing statuscode, header on console
        //http header is the piece of information that we are sending back as a response
        //there are many types of standard header
        //header and status code need declare bedore we send response
        res.writeHead(404, {
            'Content-type': 'text/html', //by this a browser now expect html
            'my-own-header': 'hello'

        })
        res.end('<h1>Page not found!<h1>')
        //network tab e we can see the details of header info by clicking the name
    }

    //send back a response to the client 
    // res.end('Hello from the server!')
})
//listining incoming req from the client - starting up the server
//port , localhost(local computer address), oprional callback func - whicj will be run as soon as server start
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
})
//now we have to run the file like node index.js then go to this specific localhost like 127.0.0.1:8000
//we create request by hitting local host ip and port and an event fired then from crateserver callback function execute
//for anychanges we need to close the server by hitting cntl c then start again
