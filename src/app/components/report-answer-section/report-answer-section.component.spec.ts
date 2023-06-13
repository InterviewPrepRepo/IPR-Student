import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnswerSectionComponent } from './report-answer-section.component';

describe('ReportAnswerSectionComponent', () => {
  let component: ReportAnswerSectionComponent;
  let fixture: ComponentFixture<ReportAnswerSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportAnswerSectionComponent]
    });
    fixture = TestBed.createComponent(ReportAnswerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
