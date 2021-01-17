#! /usr/bin/env node
//module.js:
import TemplateCoverage from './template-coverage';

var templateCoverage = new TemplateCoverage();
var args = process.argv.slice(2);
templateCoverage.main(args);

module.exports = TemplateCoverage;