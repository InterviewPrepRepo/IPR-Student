import { ASTWithName } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cibGit } from '@coreui/icons';
import { InviteService } from 'src/services/invite-service/invite.service';

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})
export class InvitePageComponent {
  constructor(private invite: InviteService) {
  }
  loading: boolean = false;
  userForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      job: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      
      techCheckboxes: new FormGroup({
        restAPIs: new FormControl(),
        java: new FormControl(),
        spring: new FormControl(),
        docker: new FormControl(),
        kubernetes: new FormControl(),
        aws: new FormControl(),
        kafka: new FormControl(),
        git: new FormControl(),
        rdms: new FormControl()
      })
    }
  );

  experienceLevels: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'
  ]

  technologies: string[] = [
    'REST APIs', 'Core Java 8+', 'Spring Boot', 'Docker', 'Kubernetes', 
    'AWS', 'Kafka', 'Git/SCM', 'RDMS'
  ]

  onInviteLinkClick(): void {
    this.userForm.markAllAsTouched();
    this.loading = true;
    if (this.userForm.valid) {

      let name = this.userForm.value.firstName + ' ' + this.userForm.value.lastName;

      this.invite.onInvite(this.userForm.value.email!, name).subscribe(
        (result) => {
          this.loading = result;
        })
    }
    else {
      this.loading = false;
    }
  }
}
