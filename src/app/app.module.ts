import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, ProgressModule, AccordionModule, SharedModule } from '@coreui/angular';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { QuestionCarouselComponent } from './components/question-carousel/question-carousel.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { InterviewInviteComponent } from './components/interview-invite/interview-invite.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { InvitePageComponent } from './components/invite-page/invite-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IprCommonModule } from 'src/ipr-common/ipr-common.module';
import { TestReportsModule } from 'src/test-reports/test-reports.module';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    QuestionCarouselComponent,
    QuizListComponent,
    InterviewInviteComponent,
    NavbarComponent,
    InvitePageComponent,
    FooterComponent,
    NotFoundComponent
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
    AccordionModule,
    SharedModule,
    IconModule,
    IprCommonModule,
    TestReportsModule
  ],
  providers: [
    IconSetService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
