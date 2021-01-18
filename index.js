#! /usr/bin/env node
//module.js:
import TemplateCoverage from './template-coverage.js';

var templateCoverage = new TemplateCoverage();
var args = process.argv.slice(2);
templateCoverage.main(args);

module.exports = TemplateCoverage;