it('shouldnt show the test ngIf element testNgIf', () => {
    component.loading = true;
    componentFixture.detectChanges();

    const testElement = componentFixture.debugElement.query(By.css('#testNgIf'));

    expect(testElement).toBeTruthy();
});