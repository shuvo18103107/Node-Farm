//import file system module
const fs = require('fs');
const http = require('http');
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
    //send back a response to the client 
    res.end('Hello from the server!')
})
//listining incoming req from the client - starting up the server
//port , localhost(local computer address), oprional callback func - whicj will be run as soon as server start
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
})
//now we have to run the file like node index.js then go to this specific localhost like 127.0.0.1:8000
//we create request by hitting local host ip and port and an event fired then from crateserver callback function execute
//for anychanges we need to close the server by hitting cntl c then start again