import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cilX, cilXCircle } from '@coreui/icons';
import { InviteService } from 'src/app/services/invite-service/invite.service';


@Component({
  selector: 'app-interview-invite',
  templateUrl: './interview-invite.component.html',
  styleUrls: ['./interview-invite.component.scss']
})
export class InterviewInviteComponent {
  constructor(private invite: InviteService) {
  }

  icons = { cilX, cilXCircle };
  loading: boolean = false;
  userForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    }
  );

  //this method is used when the user submit the interview invitation modal with their username and email
  onInviteLinkClick(): void {
    this.loading = true;

    let invitee_name = this.userForm.value.name === null || this.userForm.value.name === undefined ? '' : this.userForm.value.name;
    let invitee_email = this.userForm.value.email === null || this.userForm.value.email === undefined ? '' : this.userForm.value.email;

    if (invitee_email && invitee_name) {
      // this.invite.onInvite(invitee_email, invitee_name).subscribe(
      //   (result) => {
      //     this.loading = result;
      //   }
      // )
    } //end if block for form validation
    else {
      this.loading = false;
    }
  }
}