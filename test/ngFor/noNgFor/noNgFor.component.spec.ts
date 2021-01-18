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
});