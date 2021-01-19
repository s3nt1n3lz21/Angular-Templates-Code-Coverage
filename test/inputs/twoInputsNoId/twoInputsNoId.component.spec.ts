import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestComponent } from "./twoInputs.component";

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

    it('should pass down the correct data inputName1 testInput', () => {
        component.fieldName1 = 'test data';
        componentFixture.detectChanges();

        const childElement = componentFixture.debugElement.query(By.css('#testInput1'));

        expect(childElement.componentInstance.inputName1).toEqual('test data');
    });

    it('should pass down the correct data inputName2 testInput', () => {
        component.fieldName2 = 'test data';
        componentFixture.detectChanges();

        const childElement = componentFixture.debugElement.query(By.css('#testInput2'));

        expect(childElement.componentInstance.inputName2).toEqual('test data');
    });
});


