import { Component, Input, OnInit } from '@angular/core';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
@Component({
  selector: 'app-report-answer-section',
  templateUrl: './report-answer-section.component.html',
  styleUrls: ['./report-answer-section.component.scss']
})
export class ReportAnswerSectionComponent implements OnInit {
  @Input() questions: TestAttemptQuestion[] = []
  @Input() displayCorrectAnswer:  boolean = true;

  currentQuestion : number = 1;
  videoUrl : string = "";

  constructor() { }

  ngOnInit(): void {
    this.switchVideo();
  }

  switchVideo(index? : number) {
    if(!index) {
      index = this.questions.findIndex(q => q.questionStatus === 'Answered')
    }
    if(this.questions[index] && this.questions[index].questionStatus === 'Answered') {
      this.currentQuestion = index + 1;
      this.videoUrl = this.questions[index].candidateAnswer.videoAnswer.videoUrl;
    }
  }
}
