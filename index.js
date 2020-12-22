#! /usr/bin/env node
var fs = require('fs');
function loadFile(path) {
    let dataString;
    dataString = fs.readFileSync(path).toString()
    return dataString
}

function main(args) {
    let arg1 = args[0]
    let failBelow = 80; // Fail if the html coverage is below this percentage
    let coveragePercentage = 0;
    const tests = [];
    const htmlFileName = './test/assets/test.html';
    const htmlFile = loadFile(htmlFileName)

    // Find all the ngIfs in the file
    let ngIfs = findNgIfs(htmlFile)
    for (i=0; i < ngIfs.length; i++) {
        tests.push({file: htmlFileName, test: 'ngIf should show', id: '', specExists: false})
        tests.push({file: htmlFileName, test: 'ngIf shouldnt show', id: '', specExists: false})
    }

    // Find all the ids of the ngIfs
    let ids = checkIds(ngIfs)
    for (i=0; i < ngIfs.length; i++) {
        tests[2*i].id = ids[i]
        tests[2*i+1].id = ids[i]
    }

    // Check tests exist for all the ngIfs
    const specFileName = './test/assets/testNgIfNotShow.spec.ts'
    const specFile = loadFile(specFileName)
    for (i=0; i < ids.length; i++) {
        let id = ids[i];
        // Don't check for the spec if the id doesn't exist
        if (id != '') {
            tests[2*i].specExists = checkTestExistsNGIF(specFile, new RegExp(`it\\('should show.*${id}.*`))
            tests[2*i+1].specExists = checkTestExistsNGIF(specFile, new RegExp(`it\\('shouldnt show.*${id}.*`))
        }
    }
    
    // Print out the test results to console
    console.table(tests);
    coveragePercentage = calculateCoverage(tests);
    console.log('Coverage: ' + coveragePercentage + '%');
    
    // Throw an error if the coverage is below the required percentage
    if (coveragePercentage < failBelow) {
        throw new Error('Coverage less than required specExists rate: ' + failBelow)
    }
   
    // e.g.
    // file          test                  id                 specExists 
    // test.html     ngIf should show                         
    // test.html     ngIf shouldnt show
    
    // Coverage: 50%
};

// Grab a list of all the elements with an ngIf
function findNgIfs(file) {
    const regexToSearchFor = /<[^/<>]*\*ngIf[^/<>]*>/g; // < something *ngIf something >
    const ngIfElements = file.match(regexToSearchFor);
    return ngIfElements;
}

// Check which elements have an id and print file names and line numbers of ngIfs that do not have an id
function checkIds(elements) {
    len = elements.length
    ids = []
    for (let i = 0; i < len; i++) {
        const regexToSearchFor = /id=".*"/g;
        id = elements[i].match(regexToSearchFor);
        if (id) {
            id = id[0]
            id = id.split('"')[1]
        }
        if (id) {
            ids.push(id)
        } else {
            ids.push('');
        }
    }
    return ids
}

// Look for a test title that matches the given regex string
function checkTestExistsNGIF(specFile, testRegex) {
    const unitTest = specFile.match(testRegex);
    if (unitTest) {
        return true
    } else {
        return false
    }
}

function calculateCoverage(tests) {
    numSpecExists = 0;
    for (i=0; i < tests.length; i++) {
        if (tests[i].specExists) {
            numSpecExists += 1
        }
    }
    return parseFloat(numSpecExists)/tests.length*100;
}

var args = process.argv.slice(2);
main(args);

// Minimum: ngIf only, 1 should show test and 1 shouldn't show test