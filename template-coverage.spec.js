const TemplateCoverage = require("./template-coverage");

describe('template-coverage', () => {

    let templateCoverage = new TemplateCoverage();

    beforeEach(() => {
        templateCoverage = new TemplateCoverage();
        templateCoverage.main(['--failBelow=0'])
    });

    it('should set the failBelow value to the value passed in through the command line', () => {
        spyOn(templateCoverage,'showCoverage');

        templateCoverage.main(['--failBelow=0']);

        expect(templateCoverage.failBelow).toEqual("0");
    });

    it('should check for tests for each html file', () => {
        spyOn(templateCoverage, 'checkForTests');

        templateCoverage.main(['--failBelow=0']);

        expect(templateCoverage.checkForTests).toHaveBeenCalledTimes(6)
    });

    it('should show the coverage', () => {
        spyOn(templateCoverage,'showCoverage');

        templateCoverage.main(['--failBelow=0']);

        expect(templateCoverage.showCoverage).toHaveBeenCalledWith();
    });

    it('should calculate the coverage correctly', () => {
        templateCoverage.main(['--failBelow=0']);

        expect(templateCoverage.calculateCoverage()).toEqual(57.14);
    });
});

