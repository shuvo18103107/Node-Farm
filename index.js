//import file system module
const fs = require('fs');
//reading and writing files in sync way (blocking)
// //read a file 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// //write a file 
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written!');

//Non-blocking async way
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