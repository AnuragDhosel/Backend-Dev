const fs = require("fs");
const path = require("path");

const inputFilePath = path.resolve(__dirname, "input.txt");
const outputFilePath = path.resolve(__dirname, "output.txt");

const readStream = fs.createReadStream(inputFilePath);
const writeStream = fs.createWriteStream(outputFilePath);


const inputStream = fs.createReadStream(inputFilePath,"utf-8");

inputStream.on("data",(chunk)=>{
    console.log("Data is reading in chunks",chunk)
})

readStream.pipe(writeStream);