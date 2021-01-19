import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestComponent } from "./twoOutputsNoId.component";

describe('TestComponent', () => {
    let component: TestComponent;
    let componentFixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
            ]
        });
    }));

    beforeEach(() => {
        componentFixture = TestBed.createComponent(TestComponent);
        component = componentFixture.componentInstance;
        componentFixture.detectChanges();
    });

    it('should call the right function on outputName1 testOutput', () => {
        spyOn(component,'functionName1');

        const testElement = componentFixture.debugElement.query(By.css('#testOutput'));
        testElement.nativeElement.dispatchEvent(new Event('outputName1'))

        expect(component.functionName1).toHaveBeenCalledWith(jasmine.any(Event));
    });

    it('should call the right function on outputName2 testOutput', () => {
        spyOn(component,'functionName2');

        const testElement = componentFixture.debugElement.query(By.css('#testOutput'));
        testElement.nativeElement.dispatchEvent(new Event('outputName2'))

        expect(component.functionName2).toHaveBeenCalledWith(jasmine.any(Event));
    });
});


