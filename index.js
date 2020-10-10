#! /usr/bin/env node
var fs = require('fs');
function loadFile(path) {
    let dataString;
    dataString = fs.readFileSync(path).toString()
    return dataString
}

function main(args) {
    let arg1 = args[0]
    const data = loadFile('./test/assets/test.html')
    let ngIfs = findNgIf(data)
    checkIds(ngIfs)
};

// Grab a list of all the elements with an ngIf
function findNgIf(file) {
    const regexToSearchFor = /<[^/<>]*\*ngIf[^/<>]*>/g;
    const ngIfElements = file.match(regexToSearchFor);
    console.log(ngIfElements)
    return ngIfElements;
}

// Check which elements have an id and print file names and line numbers of ngIfs that do not have an id
function checkIds(elements) {
    len = elements.length
    for (let i = 0; i < len; i++) {
        const regexToSearchFor = /id=".*"/g;
        id = elements[i].match(regexToSearchFor);
        if (id) {
            console.log('There is an id')
        } else {
            console.warn('There is no id for the ngIf element\n')
        }
    }
}

function hasId() {

}

// Grab all unit test titles


// Check for 

var args = process.argv.slice(2);
main(args);