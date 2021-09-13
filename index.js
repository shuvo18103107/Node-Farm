//reading and writing files
const fs = require('fs');
//read a file 
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
//write a file 
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File Written!');
