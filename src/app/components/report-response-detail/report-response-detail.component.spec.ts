import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportResponseDetailComponent } from './report-response-detail.component';

describe('ReportResponseDetailComponent', () => {
  let component: ReportResponseDetailComponent;
  let fixture: ComponentFixture<ReportResponseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportResponseDetailComponent]
    });
    fixture = TestBed.createComponent(ReportResponseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
