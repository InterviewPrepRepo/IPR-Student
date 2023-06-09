import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  {
    path: 'quiz',
    component: QuizListComponent
  },
  {
    path: 'report',
    component: ReportsComponent
  },
  {
    path: '',
    component: QuizListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
