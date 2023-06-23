import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePageComponent } from './invite-page.component';

describe('InvitePageComponent', () => {
  let component: InvitePageComponent;
  let fixture: ComponentFixture<InvitePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitePageComponent]
    });
    fixture = TestBed.createComponent(InvitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
