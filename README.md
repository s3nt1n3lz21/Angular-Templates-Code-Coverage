# Angular-Templates-Code-Coverage
A Script To Check The Coverage Of Your Angular Templates

This is a simple script to check the code coverage of your html templates by checking for unit tests that contain the Id of the NgIf and NgFor elements.

## Install

npm install angular-templates-code-coverage

## Usage

const templatesCoverage = require("angular-templates-code-coverage");

templatesCoverage();

Algorithm
- Search For NgIfs And NgFors
- Grab The Ids Of These Elements
- Search For Unit Tests With A Title That Includes This Id
