import { TestComponent } from "./test.component";

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

    it('should show the test ngIf element testNgIf', () => {
        component.loading = false;
        componentFixture.detectChanges();

        const testElement = componentFixture.debugElement.query(By.css('#testNgIf'));

        expect(testElement).toBeTruthy();
    });
});