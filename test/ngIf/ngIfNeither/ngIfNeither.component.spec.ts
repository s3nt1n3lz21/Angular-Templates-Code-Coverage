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
});