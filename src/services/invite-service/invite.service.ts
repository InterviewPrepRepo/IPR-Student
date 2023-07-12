import { Injectable } from '@angular/core';
import { ImochaService } from '../imocha-service/imocha.service';
import TestInvitation from 'src/models/testInvitation';
import { AuthService } from '../auth-service/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private imocha: ImochaService, private auth: AuthService) { }

  readonly testId : number = 1250203;
  
  onInvite(invitee_email: string, invitee_name: string, invitee_job: string, invitee_experience: number, invitee_technologies: string[]): Observable<boolean> {
    invitee_email = invitee_email.toLowerCase();

    const loading = new BehaviorSubject(true);
    this.imocha.getTestAttempts(this.testId).subscribe({
      next: (response: TestInvitation[]) => {

        //This is a predicate function, which returns boolean
        let attemptExists = (testAttempt: TestInvitation) => {
          if (testAttempt.email.toLowerCase() === invitee_email)
            return true;
          else
            return false;
        }

        const attemptIndex = response.findIndex(attemptExists);
        //We never invited this email to this test before
        if (attemptIndex === -1) {
          //Fire off invite
          this.imocha.inviteCandidate(this.testId, invitee_name, invitee_email, invitee_job, invitee_experience, invitee_technologies).subscribe({
            next: ({ testUrl, testInvitationId }) => {
              this.auth.setCurrentUser({
                name: invitee_name,
                email: invitee_email,
                attemptId: testInvitationId,
                testId: this.testId
              })
              //Changing url to coding.revature.com
              testUrl = testUrl.replace("test.imocha.io", "coding.revature.com");
              window.open(testUrl, '_self');
              loading.next(false);
            },
            error: (err) => {
              console.error(err);
              loading.next(false);
            }
          })
        } //end if block for finding if attempt exists for this test
        else {

          //re-attempt
          this.imocha.reattemptCandidate(this.testId, response[attemptIndex].testInvitationId).subscribe({
            next: ({ testInvitationId, testUrl }) => {
              this.auth.setCurrentUser({
                name: invitee_name,
                email: invitee_email,
                attemptId: testInvitationId,
                testId: this.testId
              })
              //Changing URL to coding.revature.com
              testUrl = testUrl.replace("test.imocha.io", "coding.revature.com")
              window.open(testUrl, '_self');
              loading.next(false);
            },
            error: (err) => {
              console.error(err);
              loading.next(false);
            }
          })
        } //end else block
      },
      error: (err) => {
        console.error(err);
        loading.next(false);
      }
    })

    return loading;
  }
}
