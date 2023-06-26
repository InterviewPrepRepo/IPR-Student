import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { TestAttemptReportsComponent } from './components/test-attempt-reports/test-attempt-reports.component';
import { InvitePageComponent } from './components/invite-page/invite-page.component';
import { AuthService } from './services/auth-service/auth.service';


// const canActivateReport: CanActivateFn =
//   (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//     const router = inject(Router);
//     if (inject(AuthService).isAuthenticated()) {
//       return true;
//     } else {
//       router.navigate(['invite']);
//       return false;
//     }
//   };


const routes: Routes = [
  {
    path: 'report',
    component: TestAttemptReportsComponent,
    // canActivate: [canActivateReport]
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
