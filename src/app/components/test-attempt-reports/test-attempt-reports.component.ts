import { Component } from '@angular/core';
import { ImochaService } from 'src/app/services/imocha-service/imocha.service';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import TestInvitation from 'src/app/models/testInvitation';

@Component({
  selector: 'app-test-attempt-reports',
  templateUrl: './test-attempt-reports.component.html',
  styleUrls: ['./test-attempt-reports.component.scss']
})
export class TestAttemptReportsComponent {

  constructor(private imocha: ImochaService, private auth: AuthService, private activatedRoute: ActivatedRoute) {}
  activeTabIndex = 0;
  attempts : TestInvitation[] = [];
  loading: boolean = true;
  ngOnInit(): void {
    const currentUser: User = this.auth.getCurrentUser();
    if(currentUser && currentUser.email) {
      this.activatedRoute.queryParams.subscribe(({ testId }) => {
        this.imocha.getTestAttempts(testId).subscribe((res) => {
          this.attempts = res.filter((testAttempt : TestInvitation) => testAttempt.email === currentUser.email)
          this.loading = false;
        })
      })
    }
    
  }

  activeTab(i : number): void {
    this.activeTabIndex = i;
    window.dispatchEvent(new Event('resize'))
  }
}
