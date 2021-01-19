import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestComponent } from "./oneInputNoId.component";

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

    it('should pass down the correct data inputName testInput', () => {
        component.fieldName = 'test data';
        componentFixture.detectChanges();

        const childElement = componentFixture.debugElement.query(By.css('#testInput'));

        expect(childElement.componentInstance.inputName).toEqual('test data');
    });
});


