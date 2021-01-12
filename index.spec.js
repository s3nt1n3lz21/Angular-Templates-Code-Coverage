const index = require("./index");

describe('index', () => {

    let templateCoverage = new index.TemplateCoverage();

    beforeEach(() => {
        templateCoverage = new index.TemplateCoverage();
        templateCoverage.main(['--failBelow=0'])
    });

    it('should set the failBelow value to the value passed in through the command line', () => {

    });

    it('should check for tests for each html file', () => {

    });

    it('should show the coverage', () => {
        spyOn(templateCoverage,'showCoverage');

        templateCoverage.main(['--failBelow=0']);

        expect(templateCoverage.showCoverage).toHaveBeenCalledWith()
    });

    it('should calculate the coverage correctly', () => {

    });
});

