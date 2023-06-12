import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ImochaService } from 'src/app/services/imocha-service/imocha.service';

@Component({
  selector: 'app-interview-invite',
  templateUrl: './interview-invite.component.html',
  styleUrls: ['./interview-invite.component.scss']
})
export class InterviewInviteComponent {
  constructor(private imocha: ImochaService, private auth: AuthService) { }
  loading = false;
  userForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    }
  );
  onInviteLinkClick(): void {
    this.loading = true;

    let invitee_name = this.userForm.value.name === null || this.userForm.value.name === undefined ? '' : this.userForm.value.name;
    let invitee_email = this.userForm.value.email === null || this.userForm.value.email === undefined ? '' : this.userForm.value.email;
    this.imocha.inviteCandidate(1244440, invitee_name, invitee_email).subscribe({
      next: ({ testInvitationId, testUrl }) => {
        this.auth.setCurrentUser({
          name: invitee_name,
          email: invitee_email,
          attemptId: testInvitationId,
          testId: 1244440
        })
        this.loading = false;
        window.open(testUrl, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}