let index = require("../../index");

describe('ngIf', () => {

    let templateCoverage = new index.TemplateCoverage();

    beforeEach(() => {
        templateCoverage = new index.TemplateCoverage();
        templateCoverage.main(['--failBelow=0'])
    });

    it('should produce the correct results for ngIfShow', () => {
        const tests = templateCoverage.tests.filter(test => 
            test.file.split(':')[0] === 'ngIfShow.component.html'
        )
        console.log('index.tests: ', index.tests)
        const expectedTests = [
            {file: 'ngIfShow.component.html:1', test: 'ngIf should show', id: 'testNgIf', specExists: true},
            {file: 'ngIfShow.component.html:1', test: 'ngIf shouldnt show', id: 'testNgIf', specExists: false}
        ];

        expect(tests.length).toEqual(2);
        expect(tests).toEqual(expectedTests);
    });

    it('should produce the correct results for ngIfNotShow', () => {
        const tests = templateCoverage.tests.filter(test => 
            test.file.split(':')[0] === 'ngIfNotShow.component.html'
        )
        const expectedTests = [
            {file: 'ngIfNotShow.component.html:1', test: 'ngIf should show', id: 'testNgIf', specExists: false},
            {file: 'ngIfNotShow.component.html:1', test: 'ngIf shouldnt show', id: 'testNgIf', specExists: true}
        ];

        expect(tests.length).toEqual(2);
        expect(tests).toEqual(expectedTests);
    });

    it('should produce the correct results for ngIfNeither', () => {
        const tests = templateCoverage.tests.filter(test => 
            test.file.split(':')[0] === 'ngIfNeither.component.html'
        )
        const expectedTests = [
            {file: 'ngIfNeither.component.html:1', test: 'ngIf should show', id: 'testNgIf', specExists: false},
            {file: 'ngIfNeither.component.html:1', test: 'ngIf shouldnt show', id: 'testNgIf', specExists: false}
        ];

        expect(tests.length).toEqual(2);
        expect(tests).toEqual(expectedTests); 
    });

    it('should produce the correct results for ngIfEmptyId', () => {
        const tests = templateCoverage.tests.filter(test => 
            test.file.split(':')[0] === 'ngIfEmptyId.component.html'
        )
        const expectedTests = [
            {file: 'ngIfEmptyId.component.html:1', test: 'ngIf should show', id: '', specExists: false},
            {file: 'ngIfEmptyId.component.html:1', test: 'ngIf shouldnt show', id: '', specExists: false}
        ];

        expect(tests.length).toEqual(2);
        expect(tests).toEqual(expectedTests); 
    });

    it('should produce the correct results for ngIfBoth', () => {
        const tests = templateCoverage.tests.filter(test => 
            test.file.split(':')[0] === 'ngIfBoth.component.html'
        )
        const expectedTests = [
            {file: 'ngIfBoth.component.html:1', test: 'ngIf should show', id: 'testNgIf', specExists: true},
            {file: 'ngIfBoth.component.html:1', test: 'ngIf shouldnt show', id: 'testNgIf', specExists: true}
        ];

        expect(tests.length).toEqual(2);
        expect(tests).toEqual(expectedTests); 
    });

    it('should produce the correct results for 2ngIfsBothIds', () => {
        const tests = templateCoverage.tests.filter(test => 
            test.file.split(':')[0] === '2ngIfsBothIds.component.html'
        )
        const expectedTests = [
            {file: '2ngIfsBothIds.component.html:1', test: 'ngIf should show', id: 'testNgIf1', specExists: true},
            {file: '2ngIfsBothIds.component.html:1', test: 'ngIf shouldnt show', id: 'testNgIf1', specExists: true},
            {file: '2ngIfsBothIds.component.html:2', test: 'ngIf should show', id: 'testNgIf2', specExists: true},
            {file: '2ngIfsBothIds.component.html:2', test: 'ngIf shouldnt show', id: 'testNgIf2', specExists: true}
        ];

        expect(tests.length).toEqual(4);
        expect(tests).toEqual(expectedTests); 
    });
});

