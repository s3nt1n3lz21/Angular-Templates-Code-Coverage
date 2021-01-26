import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestComponent } from "./textInputs.component";

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

    it('should set the field when the user enters something into the input testInput', () => {
        component.fieldName = 'test data';
        componentFixture.detectChanges();

        const inputElement = componentFixture.debugElement.query(By.css('#testInput'));
        inputElement.nativeElement.value = 'new value';
        inputElement.nativeElement.dispatchEvent(new Event('input'));

        expect(component.testControlName).toEqual('test data');
    });
});


