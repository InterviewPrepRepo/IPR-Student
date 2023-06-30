import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRadarChartComponent } from './section-radar-chart.component';

describe('SectionChartComponent', () => {
  let component: SectionRadarChartComponent;
  let fixture: ComponentFixture<SectionRadarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionRadarChartComponent]
    });
    fixture = TestBed.createComponent(SectionRadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
