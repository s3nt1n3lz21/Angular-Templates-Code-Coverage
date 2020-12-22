it('should show the test ngIf element', () => {
    component.loading = false;
    componentFixture.detectChanges();

    const testElement = componentFixture.debugElement.query(By.css('#testNgIf'));

    expect(testElement).toBeTruthy();
});