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

    it('should show the test ngIf element testNgIf1', () => {
        component.loading = false;
        componentFixture.detectChanges();

        const testElement = componentFixture.debugElement.query(By.css('#testNgIf1'));

        expect(testElement).toBeTruthy();
    });

    it('shouldnt show the test ngIf element testNgIf1', () => {
        component.loading = true;
        componentFixture.detectChanges();

        const testElement = componentFixture.debugElement.query(By.css('#testNgIf1'));

        expect(testElement).toBeTruthy();
    });

    it('should show the test ngIf element testNgIf2', () => {
        component.loading = false;
        componentFixture.detectChanges();

        const testElement = componentFixture.debugElement.query(By.css('#testNgIf2'));

        expect(testElement).toBeTruthy();
    });

    it('shouldnt show the test ngIf element testNgIf2', () => {
        component.loading = true;
        componentFixture.detectChanges();

        const testElement = componentFixture.debugElement.query(By.css('#testNgIf2'));

        expect(testElement).toBeTruthy();
    });
});