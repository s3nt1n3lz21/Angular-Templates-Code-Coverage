#! /usr/bin/env node
const https = require('https')
async function loadFileAndPrintToConsole(url) {
    // var data = require(url);
    // https.get(url).subscribe(
    //     (data) => {
    //         console.log(data)
    //         return data
    //     },
    //     (error) => {
    //         console.error(error)
    //         return null
    //     }
    // );
    console.log('Hello world')
    // var client = new XMLHttpRequest();
    // client.open('GET', url);
    // client.onreadystatechange = function() {
    // alert(client.responseText);
    // }
    // client.send();
}

function main(args) {
    console.log(args)
    let file = args[0]
    const data = loadFileAndPrintToConsole('test.html')
    console.log(data)
};

var args = process.argv.slice(2);
main(args);