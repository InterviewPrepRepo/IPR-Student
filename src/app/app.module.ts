import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, ProgressModule } from '@coreui/angular';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { QuestionCarouselComponent } from './components/question-carousel/question-carousel.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { InterviewInviteComponent } from './components/interview-invite/interview-invite.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { SectionChartComponent } from './components/section-chart/section-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    QuestionCarouselComponent,
    QuizListComponent,
    InterviewInviteComponent,
    NavbarComponent,
    ReportsComponent,
    LoadingComponent,
    SectionChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressModule,
    ModalModule,
    BrowserAnimationsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
