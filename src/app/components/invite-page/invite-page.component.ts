import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InviteService } from 'src/app/services/invite-service/invite.service';

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})
export class InvitePageComponent {
  constructor(private invite: InviteService) {
  }
  testId: number = 1249369;
  loading: boolean = false;
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

    if (invitee_email && invitee_name) {
      this.invite.onInvite(this.testId, invitee_email, invitee_name);
      this.loading = false;
    } //end if block for form validation
    else {
      this.loading = false;
    }
  }
}
