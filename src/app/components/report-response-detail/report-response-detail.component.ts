import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import { Config } from 'src/app/models/iprConfig';
@Component({
  selector: 'app-report-response-detail',
  templateUrl: './report-response-detail.component.html',
  styleUrls: ['./report-response-detail.component.scss']
})
export class ReportResponseDetailComponent implements OnInit {
  @Input() questions: TestAttemptQuestion[] = []
  currentQuestion : number = 1;
  videoUrl : string = "";
  displayCorrectAnswer : boolean = true;

  constructor(private local:LocalStorageService) {
    const config = this.local.get('ipr_config') as Config;
    if(config) {
      this.displayCorrectAnswer = config.displayCorrectAnswer ?? true;
    }
    else {
      this.displayCorrectAnswer = true;
    }
  }

  ngOnInit(): void {
    if(this.questions && this.questions.length > 0) {
      const firstAnsweredQ = this.questions.findIndex(q => q.questionStatus === 'Answered')
      this.switchVideo(firstAnsweredQ);
    }
  }

  switchVideo(index : number) {
    if(this.questions[index] && this.questions[index].questionStatus === 'Answered') {
      this.currentQuestion = index + 1;
      this.videoUrl = this.questions[index].candidateAnswer.videoAnswer.videoUrl;
    } 
  }

  onDisplayAnswerClick() : void {
    this.displayCorrectAnswer = !this.displayCorrectAnswer;
    let config = this.local.get('ipr_config');
    if(config) {
      config.displayCorrectAnswer = this.displayCorrectAnswer;
    }
    else {
      config = {
        displayCorrectAnswer: this.displayCorrectAnswer
      };
    }
    this.local.set('ipr_config', config);
  }
}
