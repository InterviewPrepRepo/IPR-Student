import { Component } from '@angular/core';
import { ImochaService } from 'src/services/imocha-service/imocha.service';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/models/user';
import { AuthService } from 'src/services/auth-service/auth.service';
import TestInvitation from 'src/models/testInvitation';
import { NotifyService } from 'src/services/notify-service/notify.service';
import { Observable, forkJoin } from 'rxjs';
import TestAttemptQuestion from 'src/models/testAttemptQuestion';
import ChartData from 'src/models/chartData';
@Component({
  selector: 'test-attempt-reports',
  templateUrl: './test-attempt-reports.component.html',
  styleUrls: ['./test-attempt-reports.component.scss']
})
export class TestAttemptReportsComponent {

  constructor(private imocha: ImochaService, private auth: AuthService, private activatedRoute: ActivatedRoute, private router : Router, private notify: NotifyService) {}
  
  activeTabIndex = 0;
  attempts : TestInvitation[] = [];
  attemptDetails : Record<number, { questions: TestAttemptQuestion[], testScore: number, scoreData: ChartData }> = {};
  loading: boolean = false;
  allAttemptSectionScore : {name: string, data: number[]}[] = [];

  ngOnInit(): void {
    const currentUser: User = this.auth.getCurrentUser();

    if(currentUser && currentUser.email) {
      this.loading = true;

      this.activatedRoute.queryParams.subscribe(({ testId }) => {
        if(!testId) this.router.navigate(['invite'])

        this.imocha.getTestAttempts(testId).subscribe({
          next: (res) => {
          this.attempts = res.filter((testAttempt : TestInvitation) => testAttempt.email.toLowerCase() === currentUser.email?.toLowerCase())
          let attemptRequestArr : Observable<{testInvitationId: number, questions: TestAttemptQuestion[], testScore: number, scoreData: ChartData}>[] = [];
          
          this.attempts.map((testInvite: TestInvitation) => {
            attemptRequestArr.push(this.imocha.getQuestionsByTestAttemptId(testInvite.testInvitationId));
          })

          forkJoin(attemptRequestArr).subscribe((results) => {
            results.map((singleResult, idx: number) => {
              this.attemptDetails[singleResult.testInvitationId] = {
                questions: singleResult.questions,
                scoreData: singleResult.scoreData,
                testScore: singleResult.testScore
              }
              this.allAttemptSectionScore.push({
                name: `Attempt ${idx + 1}`,
                data: singleResult.scoreData.values
              })
            })
            this.loading = false;
          })

          },
          error: (err) => {
            console.error(err);
            this.router.navigate(['invite'])
          }
        })
      })
    }
    else {
      this.router.navigate(['invite'])
    }
  }

  activeTab(i : number) : void {
    this.activeTabIndex = i;
    this.notify.notifyTabSwitch(i);
  }
}
