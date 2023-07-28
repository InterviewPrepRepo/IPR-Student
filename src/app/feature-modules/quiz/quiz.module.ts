import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewInviteComponent } from './interview-invite/interview-invite.component';
import { QuestionCarouselComponent } from './question-carousel/question-carousel.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressModule, ModalModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { IprCommonModule } from 'src/app/feature-modules/ipr-common/ipr-common.module';

@NgModule({
  declarations: [
    InterviewInviteComponent,
    QuestionCarouselComponent,
    QuestionDetailComponent,
    QuizListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressModule,
    ModalModule,
    IconModule,
    IprCommonModule
  ],
  exports: [
    QuizListComponent
  ],
  providers: [
    IconSetService
  ]
})
export class QuizModule { }
