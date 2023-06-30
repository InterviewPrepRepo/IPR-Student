import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { TestAttemptReportsComponent } from './components/test-attempt-reports/test-attempt-reports.component';
import { InvitePageComponent } from './components/invite-page/invite-page.component';
import { AuthService } from './services/auth-service/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AttemptProcessingComponent } from './components/attempt-processing/attempt-processing.component';


const canActivateReport: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    if (inject(AuthService).isAuthenticated()) {
      return true;
    } else {
      router.navigate(['invite']);
      return false;
    }
  };


const routes: Routes = [
  {
    path: 'report',
    component: TestAttemptReportsComponent,
    canActivate: [canActivateReport]
  },
  {
    path: 'invite',
    component: InvitePageComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'invite',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
