import * as fs from 'fs';
import * as path from 'path';

export default class TemplateCoverage {

    constructor() {
        this.tests = []
        this.failBelow = 80
    }

    loadFile(path) {
        let dataString;
        dataString = fs.readFileSync(path).toString()
        return dataString
    }
    
    recFindByExt(base,ext,files,result) {
        files = files || fs.readdirSync(base) 
        result = result || [] 
    
        files.forEach( 
            (file) => {
                var newbase = path.join(base,file)
                if ( fs.statSync(newbase).isDirectory() )
                {
                    result = this.recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
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
    
    main(args) {
        this.failBelow = 80; // Fail if the html coverage is below this percentage
        let keyValueArgs = new Map()
        args.forEach(arg => {
            let keyValue = arg.split('=')
            keyValueArgs.set(keyValue[0].replace('--',''),keyValue[1])
    
            // Set the failBelow value
            if (keyValue[0].replace('--','') == 'failBelow') {
                this.failBelow = keyValue[1]
            }
        })
    
        this.tests = [];
        let path = process.cwd();
    
        // If the dir src/app exists check each folder in there
        if (fs.existsSync('src/app')) {
            path = process.cwd()+'/src/app'
        // Else check folders in the current directory
        } else {
            path = process.cwd();
        }
    
        // For each html file check a component.spec.ts file exists and the html tests exist
        let htmlFiles = this.recFindByExt(path,'component.html')
        htmlFiles.forEach(fileName => {
            let fileNamePrefix = fileName.split('.')[0]
            this.checkForTests(fileNamePrefix)
        })
    
        // Show whether or not the tests exist and the coverage
        this.showCoverage()
    }
    
    checkForTests(fileNamePrefix) {
    
        let htmlFileName = fileNamePrefix + '.component.html'
        let specFileName = fileNamePrefix + '.component.spec.ts'

        let htmlFile = this.loadFile(htmlFileName)

        // Find all the ngIfs in the file and check spec tests exist
        this.checkForNgIfTests(htmlFileName, specFileName, htmlFile);
        // Find all the ngFors in the file and check spec tests exist
        this.checkForNgForTests(htmlFileName, specFileName, htmlFile);
        // Find all the outputs in the file and check spec tests exist
        this.checkForOutputTests(htmlFileName, specFileName, htmlFile);
        // Find all the inputs in the file and check spec tests exist
        this.checkForInputTests(htmlFileName, specFileName, htmlFile);
        // Find all the ngClasses in the file and check spec tests exist
        this.checkForNgClassTests(htmlFileName, specFileName, htmlFile);
        // Find all the input and textArea elements in the file and check spec tests exist
        this.checkForFieldsSetTests(htmlFileName, specFileName, htmlFile);
    };

    checkForNgIfTests(htmlFileName, specFileName, htmlFile) {
        let ngIfs = this.findNgIfs(htmlFile)

        if (ngIfs) {
            let ids = this.checkIds(ngIfs)
            let specFile = '';
            try {
                specFile = this.loadFile(specFileName)
            } catch (e) {
                // No spec file
            }
    
            // Add tests for each ngIf in this file
            for (let i=0; i < ngIfs.length; i++) {
                let index = htmlFile.indexOf(ngIfs[i]);
                let tempString = htmlFile.substring(0, index);
                let lineNumber = tempString.split('\n').length;
                let id = ids[i];
    
                // Add tests for each
                this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'ngIf should show', id: id, specExists: false})
                this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'ngIf shouldnt show', id: id, specExists: false})
                
                // If there is a spec file and there is an id check the test exists
                if (specFile && id != '') {
                    this.tests[this.tests.length-2].specExists = this.checkTestExists(specFile, new RegExp(`it\\('should show.*${id}.*`))
                    this.tests[this.tests.length-1].specExists = this.checkTestExists(specFile, new RegExp(`it\\('shouldnt show.*${id}.*`))
                }
            }
        }
    }

    checkForNgForTests(htmlFileName, specFileName, htmlFile) {
        let ngFors = this.findNgFors(htmlFile)

        if (ngFors) {
            let ids = this.checkIds(ngFors)
            let specFile = '';
            try {
                specFile = this.loadFile(specFileName)
            } catch (e) {
                // No spec file
            }
    
            // Add tests for each ngIf in this file
            for (let i=0; i < ngFors.length; i++) {
                let index = htmlFile.indexOf(ngFors[i]);
                let tempString = htmlFile.substring(0, index);
                let lineNumber = tempString.split('\n').length;
                let id = ids[i];
    
                // Add tests for each
                this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'ngFor correct number elements', id: id, specExists: false})
                
                // If there is a spec file and there is an id check the test exists
                if (specFile && id != '') {
                    this.tests[this.tests.length-1].specExists = this.checkTestExists(specFile, new RegExp(`it\\('should show the correct number of.*${id}.*`))
                }
            }
        }
    }

    checkForOutputTests(htmlFileName, specFileName, htmlFile) {
        let outputElements = this.findOutputElements(htmlFile)

        if (outputElements) {
            let ids = this.checkIds(outputElements)
            let specFile = '';
            try {
                specFile = this.loadFile(specFileName)
            } catch (e) {
                // No spec file
            }
    
            // Add tests for each ngIf in this file
            for (let i=0; i < outputElements.length; i++) {
                let index = htmlFile.indexOf(outputElements[i]);
                let tempString = htmlFile.substring(0, index);
                let lineNumber = tempString.split('\n').length;
                let id = ids[i];

                // For each output on this element
                let outputNames = this.findOutputNames(outputElements[i])
                for (let j=0; j < outputNames.length; j++) {
                    let outputName = outputNames[j];

                    // Add tests for each output
                    this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'correct function on output', id: `${outputName} ${id}`, specExists: false})
                
                    // If there is a spec file and there is an id check the test exists
                    if (specFile && id != '') {
                        this.tests[this.tests.length-1].specExists = this.checkTestExists(specFile, new RegExp(`it\\('.*${outputName} ${id}.*`))
                    }
                }
            }
        }
    }

    checkForInputTests(htmlFileName, specFileName, htmlFile) {
        let inputElements = this.findElementsWithInputs(htmlFile)

        if (inputElements) {
            let ids = this.checkIds(inputElements)
            let specFile = '';
            try {
                specFile = this.loadFile(specFileName)
            } catch (e) {
                // No spec file
            }
    
            // Add tests for each input in this file
            for (let i=0; i < inputElements.length; i++) {
                let index = htmlFile.indexOf(inputElements[i]);
                let tempString = htmlFile.substring(0, index);
                let lineNumber = tempString.split('\n').length;
                let id = ids[i];

                // For each output on this element
                let inputNames = this.findInputNames(inputElements[i])
                for (let j=0; j < inputNames.length; j++) {
                    let inputName = inputNames[j];

                    // Add tests for each output
                    this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'input passed down correctly', id: `${inputName} ${id}`, specExists: false})
                
                    // If there is a spec file and there is an id check the test exists
                    if (specFile && id != '') {
                        this.tests[this.tests.length-1].specExists = this.checkTestExists(specFile, new RegExp(`it\\('.*${inputName} ${id}.*`))
                    }
                }
            }
        }
    }

    checkForNgClassTests(htmlFileName, specFileName, htmlFile) {
        let ngClassElements = this.findNGClassElements(htmlFile)

        if (ngClassElements) {
            let ids = this.checkIds(ngClassElements)
            let specFile = '';
            try {
                specFile = this.loadFile(specFileName)
            } catch (e) {
                // No spec file
            }
    
            // Add tests for each ngIf in this file
            for (let i=0; i < ngClassElements.length; i++) {
                let index = htmlFile.indexOf(ngClassElements[i]);
                let tempString = htmlFile.substring(0, index);
                let lineNumber = tempString.split('\n').length;
                let id = ids[i];

                // For each ng class on this element
                let ngClassNames = this.findNGClassNames(ngClassElements[i])
                for (let j=0; j < ngClassNames.length; j++) {
                    let ngClassName = ngClassNames[j];

                    // Add tests for each ng class
                    this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'class applied', id: `${ngClassName} ${id}`, specExists: false});
                    this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'class not applied', id: `${ngClassName} ${id}`, specExists: false});

                    // If there is a spec file and there is an id check the test exists
                    if (specFile && id != '') {
                        this.tests[this.tests.length-2].specExists = this.checkTestExists(specFile, new RegExp(`it\\('.*should apply.*${ngClassName} ${id}.*`))
                        this.tests[this.tests.length-1].specExists = this.checkTestExists(specFile, new RegExp(`it\\('.*should not apply.*${ngClassName} ${id}.*`))
                    }
                }
            }
        }
    }

    checkForFieldsSetTests(htmlFileName, specFileName, htmlFile) {
        let inputElements = this.findInputElements(htmlFile);

        if (inputElements) {
            let ids = this.checkIds(inputElements)
            let specFile = '';
            try {
                specFile = this.loadFile(specFileName)
            } catch (e) {
                // No spec file
            }
    
            // Add tests for each input in this file
            for (let i=0; i < inputElements.length; i++) {
                let index = htmlFile.indexOf(inputElements[i]);
                let tempString = htmlFile.substring(0, index);
                let lineNumber = tempString.split('\n').length;
                let id = ids[i];

                // Add a test for this input
                this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'field set correctly', id: `${id}`, specExists: false});

                if (specFile && id != '') {
                    this.tests[this.tests.length-1].specExists = this.checkTestExists(specFile, new RegExp(`it\\('.*set the field.*${id}.*`))
                }
            }
        }

        let textAreaElements = this.findTextAreaElements(htmlFile);

        if (textAreaElements) {
            let ids = this.checkIds(textAreaElements)
            let specFile = '';
            try {
                specFile = this.loadFile(specFileName)
            } catch (e) {
                // No spec file
            }
    
            // Add tests for each text area in this file
            for (let i=0; i < textAreaElements.length; i++) {
                let index = htmlFile.indexOf(textAreaElements[i]);
                let tempString = htmlFile.substring(0, index);
                let lineNumber = tempString.split('\n').length;
                let id = ids[i];

                // Add a test for this input
                this.tests.push({file: htmlFileName + ':' + lineNumber, test: 'field set correctly', id: `${id}`, specExists: false});

                if (specFile && id != '') {
                    this.tests[this.tests.length-1].specExists = this.checkTestExists(specFile, new RegExp(`it\\('.*set the field.*${id}.*`))
                }
            }
        }
    }
    
    showCoverage() {
        // Print out the test results to console
        this.tests.forEach((test) => {
            test.file = test.file.split('\\')[test.file.split('\\').length-1]
        })
        console.table(this.tests);
        let coveragePercentage = this.calculateCoverage();
        console.log('Coverage: ' + coveragePercentage + '%');
        
        // Throw an error if the coverage is below the required percentage
        if (coveragePercentage < this.failBelow) {
            throw new Error('Coverage less than required specExists rate: ' + this.failBelow)
        }
       
        // e.g.
        // file          test                  id                 specExists 
        // test.html     ngIf should show                         
        // test.html     ngIf shouldnt show
        
        // Coverage: 50%
    }
    
    // Grab a list of all the elements with an ngIf
    findNgIfs(file) {
        const regexToSearchFor = /<[^/<>]*\*ngIf[^/<>]*>/g; // < something *ngIf something >
        const ngIfElements = file.match(regexToSearchFor);
        return ngIfElements;
    }

    // Grab a list of all the elements with an ngFor
    findNgFors(file) {
        const regexToSearchFor = /<[^/<>]*\*ngFor[^/<>]*>/g; // < something *ngFor something >
        const ngForElements = file.match(regexToSearchFor);
        return ngForElements;
    }

    // Grab a list of all the elements with outputs
    findOutputElements(file) {
        const regexToSearchFor = /<[^/<>()]*\([^/<>()]*\)="[^/<>()]*\([^/<>()]*\)"[^/<>]*>/g; // < something (something)="something(something)" something >
        const outputElements = file.match(regexToSearchFor);
        return outputElements;
    }

    // Get a list of all the output names for the given element
    findOutputNames(element) {
        const regexToSearchFor = /\([^/<>()]*\)=/g; // (something)=
        const namesWithEquals = element.match(regexToSearchFor);
        let outputNames = []
        namesWithEquals.forEach((name) => outputNames.push(name.slice(1,name.length-2)));
        return outputNames;
    }

    // Grab a list of all the elements with inputs
    findElementsWithInputs(file) {
        const regexToSearchFor = /<[^/<>()]*\[(?!ngClass)[^/<>()]*\]="[^/<>()]*"[^/<>]*>/g; // < something [something]="something" something >  not ngClass
        const outputElements = file.match(regexToSearchFor);
        return outputElements;
    }

    // Get a list of all the input names for the given element
    findInputNames(element) {
        const regexToSearchFor = /\[[^/<>()='"]*\]=/g; // [something]=
        const namesWithEquals = element.match(regexToSearchFor);
        let inputNames = []
        namesWithEquals.forEach((name) => inputNames.push(name.slice(1,name.length-2)));
        return inputNames;
    }

    // Get a list of all the elements with ngClass
    findNGClassElements(file) {
        const regexToSearchFor = /<[^/<>()]*\[ngClass\]="[^/<>()]*"[^/<>]*>/g; // < something [ngClass]="something" something >
        const ngClassElements = file.match(regexToSearchFor);
        return ngClassElements;
    }

    // Get a list of all the ng class names for the given element
    findNGClassNames(element) {
        let ngClassNames = []

        // The className could be surrounded in single quotes or double qoutes
        const singleQuoteRegexNgClassPart = /\[ngClass\]="[^/<>()="]*"/g; // [ngClass]="something"
        const singleQuoteNGClassPart = element.match(singleQuoteRegexNgClassPart);
        if (singleQuoteNGClassPart) {
            const singleQuoteRegex = /'[^<>()='":]*'/g;
            const singleQoutesNames = singleQuoteNGClassPart[0].match(singleQuoteRegex);
            if (singleQoutesNames) {
                singleQoutesNames.forEach((name) => ngClassNames.push(name.slice(1,name.length-1)));
            }
        }

        const doubleQuoteRegexNgClassPart = /\[ngClass\]='[^/<>()=']*'/g; // [ngClass]='something'
        const doubleQuoteNGClassPart = element.match(doubleQuoteRegexNgClassPart);
        if (doubleQuoteNGClassPart) {
            const doubleQuoteRegex = /"[^<>()='":]*"/g;
            const doubleQuotesNames = doubleQuoteNGClassPart[0].match(doubleQuoteRegex);
            if (doubleQuotesNames) {
                doubleQuotesNames.forEach((name) => ngClassNames.push(name.slice(1,name.length-1)));
            }
        }

        // The class name could be from a getter function
        const singleQuoteGetterNgClassPartRegex = /\[ngClass\]='[^/<>()='"]*'/g; // [ngClass]='getCustomClass'
        const singleQuoteGetterNGClassPart = element.match(singleQuoteGetterNgClassPartRegex);
        if (singleQuoteGetterNGClassPart) {
            const singleQuoteGetterPropertyNameRegex = /'[^<>()='":]*'/g; // 'getCustomClass'
            const singleQuoteGetterPropertyNames = singleQuoteGetterNGClassPart[0].match(singleQuoteGetterPropertyNameRegex);
            if (singleQuoteGetterPropertyNames) {
                singleQuoteGetterPropertyNames.forEach((name) => ngClassNames.push(name.slice(1,name.length-1)));
            }
        }

        const doubleQuoteGetterNgClassPartRegex = /\[ngClass\]="[^/<>()='"]*"/g; // [ngClass]="getCustomClass"
        const doubleQuoteGetterNGClassPart = element.match(doubleQuoteGetterNgClassPartRegex);
        if (doubleQuoteGetterNGClassPart) {
            const doubleQuoteGetterPropertyNameRegex = /"[^<>()='":]*"/g; // "getCustomClass"
            const doubleQuoteGetterPropertyNames = doubleQuoteGetterNGClassPart[0].match(doubleQuoteGetterPropertyNameRegex);
            if (doubleQuoteGetterPropertyNames) {
                doubleQuoteGetterPropertyNames.forEach((name) => ngClassNames.push(name.slice(1,name.length-1)));
            }
        }

        return ngClassNames;
    }

    // Get a list of all the input elements
    findInputElements(file) {
        const regexToSearchFor = /<input[^<>]*>/g; // <input something>
        const ngClassElements = file.match(regexToSearchFor);
        return ngClassElements;
    }

    // Get a list of all the text area elements
    findTextAreaElements(file) {
        const regexToSearchFor = /<textarea[^<>]*>/g; // <textarea something>
        const ngClassElements = file.match(regexToSearchFor);
        return ngClassElements;
    }
     
    // Check which elements have an id
    checkIds(elements) {
        let len = elements ? elements.length : 0
        let ids = []
        for (let i = 0; i < len; i++) {
            const regexToSearchFor = /id=".*"/g;
            let id = elements[i].match(regexToSearchFor);
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
    checkTestExists(specFile, testRegex) {
        const unitTest = specFile.match(testRegex);
        if (unitTest) {
            return true
        } else {
            return false
        }
    }
    
    calculateCoverage() {
        let numSpecExists = 0;
        for (let i=0; i < this.tests.length; i++) {
            if (this.tests[i].specExists) {
                numSpecExists += 1
            }
        }
        return Math.round((parseFloat(numSpecExists)/this.tests.length*100 + Number.EPSILON) * 100) / 100
    }
}