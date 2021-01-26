import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TestComponent } from "./test.component";

const items = ['test item 1', 'test item 2'];

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

    it('should not apply the class className testNgClass', () => {
        component.isLoading = true;
        componentFixture.detectChanges();

        const testElement = componentFixture.debugElement.query(By.css('#testNgClass'));

        expect(testElement.nativeElement.classList).not.toContain('className');
    });
});