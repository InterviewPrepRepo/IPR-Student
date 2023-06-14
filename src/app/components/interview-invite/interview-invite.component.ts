import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ImochaService } from 'src/app/services/imocha-service/imocha.service';
import TestInvitation from 'src/app/models/testInvitation';
import { cilX, cilXCircle} from '@coreui/icons';


@Component({
  selector: 'app-interview-invite',
  templateUrl: './interview-invite.component.html',
  styleUrls: ['./interview-invite.component.scss']
})
export class InterviewInviteComponent {
  constructor(private imocha: ImochaService, private auth: AuthService) {
      }
  icons = {cilX, cilXCircle};
  loading = false;
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
    
    if(invitee_email && invitee_name)
    {
      this.imocha.getTestAttempts(1244440).subscribe({
        next:(response: TestInvitation[]) => {
          
          //This is a predicate function, which returns boolean
          let attemptExists = (testAttempt : TestInvitation) => {
            if(testAttempt.email == invitee_email)
              return true;
            else
              return false;
          }
          
          //We never invited this email to this test before
          if(response.findIndex(attemptExists) == -1)
          {
            //Fire off invite
            this.imocha.inviteCandidate(1244440, invitee_name, invitee_email).subscribe({
              next: ({testUrl, testInvitationId}) => {
        
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
          } //end if block for finding if attempt exists for this test
          else {
            //re-attempt
            this.imocha.reattemptCandidate(1244440).subscribe({
              next: ({testInvitationId, testUrl}) => {
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
                console.log(err);
              }
            })
          } //end else block
      }, 
      error: (err) => {
        console.log(err);
      }
    })
    } //end if block for form validation
    else {
      this.loading = false;
    }
    
  }
}