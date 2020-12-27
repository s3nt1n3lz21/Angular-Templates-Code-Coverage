#! /usr/bin/env node
var fs = require('fs');
var path = require('path')

function loadFile(path) {
    let dataString;
    dataString = fs.readFileSync(path).toString()
    return dataString
}

function recFindByExt(base,ext,files,result) 
{
    files = files || fs.readdirSync(base) 
    result = result || [] 

    files.forEach( 
        function (file) {
            var newbase = path.join(base,file)
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext )
                {
                    result.push(newbase)
                } 
            }
        }
    )
    return result
}

function main(args) {
    let failBelow = 80; // Fail if the html coverage is below this percentage
    let keyValueArgs = new Map()
    args.forEach(arg => {
        let keyValue = arg.split('=')
        keyValueArgs.set(keyValue[0].replace('--',''),keyValue[1])

        // Set the failBelow value
        if (keyValue[0].replace('--','') == 'failBelow') {
            failBelow = keyValue[1]
        }
    })

    const tests = [];
    let path = process.cwd();

    // If the dir src/app exists check each folder in there
    if (fs.existsSync('src/app')) {
        path = process.cwd()+'/src/app'
    // Else check folders in the current directory
    } else {
        path = process.cwd();
    }

    // For each html file check a component.spec.ts file exists and the html tests exist
    htmlFiles = recFindByExt(path,'component.html')
    htmlFiles.forEach(fileName => {
        fileNamePrefix = fileName.split('.')[0]
        checkForTests(fileNamePrefix, tests)
    })

    // Show whether or not the tests exist and the coverage
    showCoverage(tests, failBelow)
}

function checkForTests(fileNamePrefix, tests) {

    // If its a folder check the lower
    let htmlFileName = fileNamePrefix + '.component.html'
    let specFileName = fileNamePrefix + '.component.spec.ts'

    // Find all the ngIfs in the file and corresponding ids
    let htmlFile = loadFile(htmlFileName)
    let ngIfs = findNgIfs(htmlFile)
    let ids = checkIds(ngIfs)
    let specFile = '';
    try {
        specFile = loadFile(specFileName)
    } catch (e) {
        console.error(e)
    }

    // Add tests for each ngIf in this file
    for (i=0; i < ngIfs.length; i++) {
        // Add tests for each 
        tests.push({file: htmlFileName, test: 'ngIf should show', id: ids[0], specExists: false})
        tests.push({file: htmlFileName, test: 'ngIf shouldnt show', id: ids[0], specExists: false})
        // If there is a spec file and there are ids check the test exists
        if (specFile && id != '') {
            tests[tests.length-2].specExists = checkTestExistsNGIF(specFile, new RegExp(`it\\('should show.*${id}.*`))
            tests[tests.length-1].specExists = checkTestExistsNGIF(specFile, new RegExp(`it\\('shouldnt show.*${id}.*`))
        }
    }
};

function showCoverage(tests, failBelow) {
    // Print out the test results to console
    tests.forEach((test) => {
        test.file = test.file.split('\\')[test.file.split('\\').length-1]
    })
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
}

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