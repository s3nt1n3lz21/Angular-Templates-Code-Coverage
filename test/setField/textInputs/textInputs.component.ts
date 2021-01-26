import {
    Component,
} from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './app-test.component.html',
    styleUrls: ['./app-test.component.scss']
})
export class TestComponent {
    public loading: boolean = false;

    constructor() {
    }

    public fieldName;
}