import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptReportsComponent } from './test-attempt-reports.component';

describe('TestAttemptReportsComponent', () => {
  let component: TestAttemptReportsComponent;
  let fixture: ComponentFixture<TestAttemptReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAttemptReportsComponent]
    });
    fixture = TestBed.createComponent(TestAttemptReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
