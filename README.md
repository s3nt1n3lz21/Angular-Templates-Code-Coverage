# Angular-Templates-Code-Coverage

This is a script to check unit tests exist for your Angular HTML templates. It checks for unit tests with titles that include the id of the html elements.

Version: 3.3.8
Updated: 30th Oct 2021

It checks for:
* ngIf elements - 
    * A test that the element is shown. The title of the test should contain the words 'should show' and the id of the element.
    * A test that the element is not shown. The title of the test should contain the words 'shouldnt show' and the id of the element.
* ngFor elements -
    * A test that the correct number of elements are shown. The title of the test should contain the words 'should show the correct number of' and the id of the element.
* outputs -
    * A test for each output to check that the correct function is called. The title of each test should contain the name of the output, a space and then the id of the element. e.g. 'outputName id'.
* inputs -
    * A test for each input to check that the correct data is passed down to the child component. The title of each test should contain the name of the input, a space and then the id of the element. e.g. 'inputName id'.
* ngClass -
    * A test for each class in ngClass to check that the class is applied. The title of the test should contain the words 'should apply' and then the name of the class and the id of the element. e.g. 'should apply show testId'.
    * A test for each class in ngClass to check that the class is not applied. The title of the test should contain the words 'should not apply' and then the name of the class and the id of the element. e.g. 'should not apply show testId'.
* fields set correctly - 
    * A test for each input element to check the correct field updates when the user enters a new value. The title of the test should contain the words 'set the field' and then the id of the element. e.g. 'set the field testId'.
    * A test for each textarea element to check the correct field updates when the user enters a new value. The title of the test should contain the words 'set the field' and then the id of the element. e.g. 'set the field testId'.

![Imgur](https://i.imgur.com/bm1piY1.png)

It will print out the coverage percentage of your html templates. It will throw an error if the coverage is less than the failBelow limit you specify. Default is 80%.

NPM  https://www.npmjs.com/package/angular-templates-code-coverage
GitHub https://github.com/s3nt1n3lz21/Angular-Templates-Code-Coverage

## Install

npm install angular-templates-code-coverage --save-dev

## Usage

template-coverage --failBelow=70

## Development

This git repo contains both the NPM package and a folder called 'test' that contains a test angular app with HTML Templates, that we can test the NPM package against before publishing it publicly to www.npmjs.com.

We first create a local private NPM registry using Verdaccio. We publish the package to this Verdaccio registry, then download and install it from here into our test app.

Install verdaccio

npm install --global verdaccio

Run verdaccio, a local private npm registry will be created on your computer at http://localhost:4873

verdaccio

Publish the package to this private repo using 

npm publish --registry http://localhost:4873

In the terminal, change directories to the root of the test app. Then install the package into the test app

npm install angular-templates-code-coverage --registry http://localhost:4873

Run the package for the test app

template-coverage

## Publishing To NPM

To publish to NPM, first login using

npm login

Publish the package using

npm publish