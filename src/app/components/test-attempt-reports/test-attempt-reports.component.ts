import { Component } from '@angular/core';
import { ImochaService } from 'src/app/services/imocha-service/imocha.service';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import TestInvitation from 'src/app/models/testInvitation';

@Component({
  selector: 'app-test-attempt-reports',
  templateUrl: './test-attempt-reports.component.html',
  styleUrls: ['./test-attempt-reports.component.scss']
})
export class TestAttemptReportsComponent {

  constructor(private imocha: ImochaService, private auth: AuthService, private activatedRoute: ActivatedRoute, private router : Router) {}
  activeTabIndex = 0;
  attempts : TestInvitation[] = [];
  loading: boolean = false;
  ngOnInit(): void {
    const currentUser: User = this.auth.getCurrentUser();
    if(currentUser && currentUser.email) {
      this.loading = true;
      this.activatedRoute.queryParams.subscribe(({ testId }) => {
        if(!testId) this.router.navigate(['invite'])
        this.imocha.getTestAttempts(testId).subscribe({
          next: (res) => {
          this.attempts = res.filter((testAttempt : TestInvitation) => testAttempt.email.toLowerCase() === currentUser.email?.toLowerCase())
          this.loading = false;
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

  activeTab(i : number): void {
    this.activeTabIndex = i;
    window.dispatchEvent(new Event('resize'))
  }
}
