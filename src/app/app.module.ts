import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgressModule } from '@coreui/angular';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { QuestionCarouselComponent } from './components/question-carousel/question-carousel.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { InterviewInviteComponent } from './components/interview-invite/interview-invite.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    QuestionCarouselComponent,
    QuizListComponent,
    InterviewInviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
