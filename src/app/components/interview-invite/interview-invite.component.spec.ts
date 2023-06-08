import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewInviteComponent } from './interview-invite.component';

describe('InterviewInviteComponent', () => {
  let component: InterviewInviteComponent;
  let fixture: ComponentFixture<InterviewInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewInviteComponent]
    });
    fixture = TestBed.createComponent(InterviewInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
