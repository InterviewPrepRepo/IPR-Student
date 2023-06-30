import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptProcessingComponent } from './attempt-processing.component';

describe('AttemptProcessingComponent', () => {
  let component: AttemptProcessingComponent;
  let fixture: ComponentFixture<AttemptProcessingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttemptProcessingComponent]
    });
    fixture = TestBed.createComponent(AttemptProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
