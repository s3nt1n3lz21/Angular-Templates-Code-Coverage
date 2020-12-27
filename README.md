# Angular-Templates-Code-Coverage

This is a script to check unit tests exist for your Angular HTML templates. It checks for unit tests with titles that include the id of the html elements.

It checks for:  
* ngIf elements - 
    * A test that the element is shown. The title of the test should contain the words 'should show' and the id of the element.
    * A test that the element is not shown. The title of the test should contain the words 'shouldnt show' and the id of the element.

For example suppose we had the following html file 'ngIfShow.component.html' with a single ngIf div element

![Only Show Test HTML](./images/onlyShowTestHTML.png)

And we only had a test to check the ngIf is shown

![Only Show Test Spec](./images/onlyShowTestSpec.png)

In the table it will say the 'show' test exists, but the 'shouldnt show' test doesn't exist. Indexes 8 and 9.

![Template Coverage](./images/template-coverage.png)

It will print out the coverage percentage of your html templates. It will throw an error if the coverage is less than the failBelow limit you specify. Default is 80%.

NPM  https://www.npmjs.com/package/angular-templates-code-coverage   
Github  https://github.com/s3nt1n3lz21/Angular-Templates-Code-Coverage

## Install

npm install angular-templates-code-coverage --save-dev

## Usage

In the terminal type

template-coverage
