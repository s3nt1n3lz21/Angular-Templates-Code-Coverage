# Angular-Templates-Code-Coverage

This is a script to check unit tests exist for your Angular HTML templates. It checks for unit tests with titles that include the id of the html elements.

Version: 3.3.1
Updated: 24th Jan 2021

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

![Imgur](https://i.imgur.com/gE5E0HB.png)

It will print out the coverage percentage of your html templates. It will throw an error if the coverage is less than the failBelow limit you specify. Default is 80%.

Free Version (Only NgIfs)

NPM  https://www.npmjs.com/package/angular-templates-code-coverage

Full Version

PRIVJS https://app.privjs.com/package?pkg=angular-templates-code-coverage

## Install

npm install angular-templates-code-coverage --save-dev

## Usage

template-coverage --failBelow=70

## Future

* Checking tests exist for checking the correct text displays
* Checking tests exist for ngClass and the correct classes are applied
* Checking tests exist for checking user inputs update the correct field

## Report Bugs And Request New Features

You can report bugs and request new features here.

https://github.com/s3nt1n3lz21/Angular-Templates-Code-Coverage-Feedback