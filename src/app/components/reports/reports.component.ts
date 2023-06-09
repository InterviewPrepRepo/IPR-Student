import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../../services/imocha-service/imocha.service';
import TestAttemptQuestion from '../../models/testAttemptQuestion';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import User from 'src/app/models/user';
import { LocalStorageService } from 'angular-web-storage';
import { Config } from 'src/app/models/iprConfig';

interface ChartData {
  keys : string[]
  values: number[]
}
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


  scoreData: ChartData = {
    //set keys array for the chart to consume
    keys : [],
    values : []
  };

  chartOptions : any = {}; 

  constructor(private imocha: ImochaService, private auth: AuthService, private local: LocalStorageService) {
    const config = this.local.get('ipr_config') as Config;
    if(config) {
      this.displayCorrectAnswer = config.displayCorrectAnswer ?? true;
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

        //create a map for each section with the score candidate got for the questions in the section
        const sectionMap: Record<string, number[]> = {}; 
        this.questions.map((question) => {
          if(question.sectionName in sectionMap) {
            sectionMap[question.sectionName].push(question.score);
          }
          else {
            sectionMap[question.sectionName] = [ question.score ];
          }
        })
        
        //Calculate average score for each section name
        Object.keys(sectionMap).map((key) => {
          this.scoreData.keys.push(key);
          this.scoreData.values.push(sectionMap[key].reduce((a, b) => a + b, 0) / sectionMap[key].length);
        });

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
