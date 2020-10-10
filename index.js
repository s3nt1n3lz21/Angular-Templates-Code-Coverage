#! /usr/bin/env node
var fs = require('fs');
function loadFile(path) {
    let dataString;
    fs.readFile(path, function (err, data) {
        if (err) {
            throw err; 
        }
        dataString = data.toString();
        console.log(path,dataString);
        console.log('data: ', data)
        let ngIfs = findNgIf(dataString)
    });
}

function main(args) {
    let arg1 = args[0]
    const data = loadFile('./test/assets/test.html')
};

// Grab a list of all the elements with an ngIf
function findNgIf(file) {
    const regexToSearchFor = /<[^/<>]*\*ngIf[^/<>]*>/g;
    const ngIfElements = file.match(regexToSearchFor);
    console.log(ngIfElements)
    console.log(ngIfElements[0])
}

// Check which elements have an id and print file names and line numbers of ngIfs that do not have an id
function checkIds() {

}

function hasId() {

}

// Grab all unit test titles


// Check for 

var args = process.argv.slice(2);
main(args);