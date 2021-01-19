import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestComponent } from "./oneOutputNoId.component";

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

    it('should call the right function on outputName testOutput', () => {
        spyOn(component,'functionName');

        const testElement = componentFixture.debugElement.query(By.css('#testOutput'));
        testElement.nativeElement.dispatchEvent(new Event('outputName'))

        expect(component.functionName).toHaveBeenCalledWith(jasmine.any(Event));
    });
});


