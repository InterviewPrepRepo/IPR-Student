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
  loading: boolean = false;
  overlay: string = '';
  userForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    }
  );
  onInviteLinkClick(): void {
    this.userForm.markAllAsTouched();
    this.loading = true;
    this.overlay = 'overlayOn';
    if (this.userForm.valid) {

      let name = this.userForm.value.firstName + ' ' + this.userForm.value.lastName;

      this.invite.onInvite(this.userForm.value.email!, name).subscribe(
        (result) => {
          this.loading = result;
          this.overlay = '';
        })
    }
    else {
      this.loading = false;
      this.overlay = '';
    }
  }
}
