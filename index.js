//import file system module
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify')
const replaceTemplate = require('./Modules/replaceTemplate');

//slug is like the query part and we can define it in some meaningful string ex; product/?id=0 we can now use product/fresh-avocado
//................ Files..................
//reading and w riting files in sync way (blocking)
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

//though it is a sync way we may think its block the execution but it is a top level code and top level code execution once in the beginning so we use sync version of reading data so that we can store it in a variable
const tempOverView = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slug = dataObj.map(el => slugify(el.productName, { lower: true }))
console.log(slug);
console.log(slugify('Fresh Avocados', {
    lower: true
}));

// to make a server
//1. to create a server then start a server
//createserver has a callback function which is fired of each time server has a request
const server = http.createServer((req, res) => {
    // console.log(req);//get request object in terminal
    // console.log(req.url);//it gives the entire url
    // console.log(url.parse(req.url, true));// by this we get query string after url, gives true so that parse the query into an object
    //get the query and pathname from this object
    const { query, pathname } = url.parse(req.url, true);

    //routing has no relation in file like if we write in browser /any file name that will not open any file in browser for this we have need another special technique
    //url module parse the parameter value into a nicely formatted object
    //implementing routing
    // const pathName = req.url;
    //Overview Page
    if (pathname === '/' || pathname === '/overview') {
        //now we have to read the template overview but its better to do this in the beginning
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const CardHtml = dataObj
            .map((el) => replaceTemplate(tempCard, el))
            .join('');
        // console.log(CardHtml);
        const output = tempOverView.replace('{%PRODUCT_CARDS%}', CardHtml);
        res.end(output);

        // res.end('Hello from the Overview!');
    }
    //product page
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        console.log(query);
        const product = dataObj[query.id];
        // console.log(product);
        const output = replaceTemplate(tempProduct, product);
        // res.end('Hello from the Product Page!');
        res.end(output);
    }

    // . means where the script is running i mean index.js and __dirname is where the current file is located
    //API.
    else if (pathname === '/api') {
        //res.end need string not object, so we pass data cg it is in json format that is string
        //now we have to tell the browser that we are sending json
        res.writeHead(200, {
            'Content-type': 'application/json', //when we send json we need say application
        });
        //now there has a prb , each time a user hit the /api route file read again and send back response to the client, instead we can do just read the file once in the beginning and whenever user hit the route send back the data without reading the file once again
        //cg now each time when user hit the route then createserver will run and top level code execute and we get data once and the next time only create server will execute for another route but the file is already we read and store it in a variable data
        res.end(data);
    }
    //Not found
    else {
        //for showing statuscode, header on console
        //http header is the piece of information that we are sending back as a response
        //there are many types of standard header
        //header and status code need declare bedore we send response
        res.writeHead(404, {
            'Content-type': 'text/html', //by this a browser now expect html
            'my-own-header': 'hello',
        });
        res.end('<h1>Page not found!<h1>');
        //network tab e we can see the details of header info by clicking the name
    }

    //send back a response to the client
    // res.end('Hello from the server!')
});
//listining incoming req from the client - starting up the server
//port , localhost(local computer address), oprional callback func - whicj will be run as soon as server start
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});
//now we have to run the file like node index.js then go to this specific localhost like 127.0.0.1:8000
//we create request by hitting local host ip and port and an event fired then from crateserver callback function execute
//for anychanges we need to close the server by hitting cntl c then start again
