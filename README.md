# Angular-Templates-Code-Coverage

This is a script to check unit tests exist for your Angular HTML templates. It checks for unit tests with titles that include the id of the html elements.

It checks for:  
* ngIf elements - 
    * A test that the element is shown. The title of the test should contain the words 'should show' and the id of the element.
    * A test that the element is not shown. The title of the test should contain the words 'shouldnt show' and the id of the element.

![Imgur](https://i.imgur.com/cfqtg3L.png)

It will print out the coverage percentage of your html templates. It will throw an error if the coverage is less than the failBelow limit you specify. Default is 80%.

NPM  https://www.npmjs.com/package/angular-templates-code-coverage

## Install

npm install angular-templates-code-coverage --save-dev

## Usage

template-coverage --failBelow=70

## Future

* Checking tests exist for ngFors and the correct number of elements appear
* Checking tests exist for checking the correct text displays
* Checking tests exist for ngClass and the correct classes are applied
* Checking tests exist for checking the correct functions are called on child component output events
* Checking tests exist for checking child components are passed the correct inputs
* Checking tests exist for checking user inputs update the correct field
