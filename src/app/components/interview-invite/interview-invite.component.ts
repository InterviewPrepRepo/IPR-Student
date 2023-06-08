import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ImochaService } from 'src/app/services/imocha-service/imocha.service';

@Component({
  selector: 'app-interview-invite',
  templateUrl: './interview-invite.component.html',
  styleUrls: ['./interview-invite.component.scss']
})
export class InterviewInviteComponent {
  constructor(private imocha: ImochaService, private auth: AuthService) { }

  onInviteLinkClick(): void {
    this.imocha.inviteCandidate(1238185, 'Minseon Song', 'minseon.song@revature.com').subscribe({
      next: ({ testInvitationId, testUrl }) => {
        this.auth.setCurrentUser({
          name: 'Minseon Song',
          email: 'minseon.song@revature.com'
        })
        window.open(testUrl, '_self');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
