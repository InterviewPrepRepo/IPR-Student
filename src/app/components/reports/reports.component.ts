import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../../services/imocha-service/imocha.service';
import TestAttemptQuestion from '../../models/testAttemptQuestion';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import User from 'src/app/models/user';
import { LocalStorageService } from 'angular-web-storage';
import { Config } from 'src/app/models/iprConfig';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{
  currentQuestion : number = 1;

  videoUrl : string = "";
  questions : TestAttemptQuestion[] = [];
  loading: boolean = true;
  displayCorrectAnswer: boolean;

  constructor(private imocha: ImochaService, private auth: AuthService, private local: LocalStorageService) {
    const config = this.local.get('ipr_config') as Config;
    if(config && config.displayCorrectAnswer) {
      this.displayCorrectAnswer = config.displayCorrectAnswer;
    }
    else {
      this.displayCorrectAnswer = true;
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

  ngOnInit(): void {
    const currentUser : User = this.auth.getCurrentUser();
    if(currentUser && currentUser.attemptId) {
      this.imocha.getQuestionsByTestAttemptId(currentUser.attemptId).subscribe((res) => {
        this.questions = res.result;
  
        if(this.questions && this.questions.length > 0) {
          const firstAnsweredQ = this.questions.findIndex(q => q.questionStatus === 'Answered')
          this.switchVideo(firstAnsweredQ);
        }

        this.loading = false;
      })
    }
  }

  switchVideo(index : number) {
    if(this.questions[index] && this.questions[index].questionStatus === 'Answered') {
      this.currentQuestion = index + 1;
      this.videoUrl = this.questions[index].candidateAnswer.videoAnswer.videoUrl;
    } 
  }
}
