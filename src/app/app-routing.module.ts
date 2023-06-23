import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestAttemptReportsComponent } from './components/test-attempt-reports/test-attempt-reports.component';
import { InvitePageComponent } from './components/invite-page/invite-page.component';

const routes: Routes = [
  {
    path: 'report',
    component: TestAttemptReportsComponent
  },
  {
    path: 'invite',
    component: InvitePageComponent
  },
  {
    path: '',
    redirectTo: 'invite',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
