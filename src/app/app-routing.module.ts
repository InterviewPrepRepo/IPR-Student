import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SectionBarChartComponent } from './components/section-bar-chart/section-bar-chart.component';
import { TestAttemptReportsComponent } from './components/test-attempt-reports/test-attempt-reports.component';

const routes: Routes = [
  {
    path: 'quiz',
    component: QuizListComponent
  },
  {
    path: 'report',
    component: TestAttemptReportsComponent
  },
  {
    path: 'bar',
    component: SectionBarChartComponent
  },
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
