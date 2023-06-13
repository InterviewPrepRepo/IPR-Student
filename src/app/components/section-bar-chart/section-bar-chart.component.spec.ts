import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBarChartComponent } from './section-bar-chart.component';

describe('SectionBarChartComponent', () => {
  let component: SectionBarChartComponent;
  let fixture: ComponentFixture<SectionBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionBarChartComponent]
    });
    fixture = TestBed.createComponent(SectionBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
