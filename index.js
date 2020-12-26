#! /usr/bin/env node
var fs = require('fs');
var path = require('path')
function loadFile(path) {
    let dataString;
    dataString = fs.readFileSync(path).toString()
    return dataString
}

function checkFolders(path) {
    workingDirectoryFiles = fs.readdirSync(path).forEach(fileName => {
        path = process.cwd()+'/src/app'+'/'+fileName
        // If the file is a directory check the folders in there
        if (fs.lstatSync(fileName).isDirectory()) {
            checkFolders(path);
        // Else check for tests
        } else {

        }
    });
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
    let arg1 = args[0]
    let failBelow = 80; // Fail if the html coverage is below this percentage
    const tests = [];
    let path = process.cwd();

    // If the dir src/app exists check each folder in there
    if (fs.existsSync('src/app')) {
        path = process.cwd()+'/src/app'
        tsFiles = recFindByExt(path,'component.ts')
        tsFiles.filter(fileName => !fileName.endsWith('component.spec.ts'))
        specFiles = recFindByExt(path,'component.spec.ts')
        htmlFiles = recFindByExt(path,'component.html')
    // Else check folders in the current directory
    } else {
        path = process.cwd();
        tsFiles = recFindByExt(path,'component.ts')
        tsFiles = tsFiles.filter(fileName => !fileName.endsWith('component.spec.ts'))
        console.log('tsFiles: ', tsFiles)
        specFiles = recFindByExt(path,'component.spec.ts')
        console.log('specFiles: ', specFiles)
        htmlFiles = recFindByExt(path,'component.html')
        console.log('htmlFiles: ', htmlFiles)
        
        // For each html file check a component.spec.ts file exists.
        htmlFiles.forEach(fileName => {
            prefix = fileName.split('.')[0]
            console.log('prefix: ', prefix)
            checkForTests(prefix, tests)
            // if prefix
        })
    }

    showCoverage(tests, failBelow)
}

function checkForTests(fileName, tests) {

    // If its a folder check the lower
    let htmlFileName = fileName + '.component.html'
    let specFileName = fileName + '.component.spec.ts'

    console.log('htmlFileName: ', htmlFileName)

    // Find all the ngIfs in the file
    let htmlFile = loadFile(htmlFileName)
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
    const specFile = loadFile(specFileName)
    for (i=0; i < ids.length; i++) {
        let id = ids[i];
        // Don't check for the spec if the id doesn't exist
        if (id != '') {
            tests[2*i].specExists = checkTestExistsNGIF(specFile, new RegExp(`it\\('should show.*${id}.*`))
            tests[2*i+1].specExists = checkTestExistsNGIF(specFile, new RegExp(`it\\('shouldnt show.*${id}.*`))
        }
    }
};

function showCoverage(tests, failBelow) {
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