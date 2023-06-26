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
      email: new FormControl('', [Validators.required, Validators.email])
    }
  );
  onInviteLinkClick(): void {
    this.userForm.markAllAsTouched();
    this.loading = true;

    if (this.userForm.valid) {
      this.invite.onInvite(this.testId, this.userForm.value.email!, this.userForm.value.name!).subscribe(
        (result) => {
          this.loading = result;
        })
    }
    else {
      this.loading = false;
    }
  }
}
