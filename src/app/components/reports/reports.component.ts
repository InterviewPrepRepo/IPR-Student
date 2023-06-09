import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImochaService } from '../../services/imocha-service/imocha.service';
import TestAttemptQuestion from '../../models/testAttemptQuestion';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  testAttemptId : number = 0;
  currentQuestion : number = 1;
  videoUrl : string = "";
  questions : TestAttemptQuestion[] = [];
  loading: boolean = true;

  constructor(private activeRoute : ActivatedRoute, private imocha: ImochaService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.testAttemptId = params['attemptId'];

      this.imocha.getQuestionsByTestAttemptId(this.testAttemptId).subscribe((res) => {
        this.questions = res.result;

        if(this.questions && this.questions.length > 0) {
          const firstAnsweredQ = this.questions.findIndex(q => q.questionStatus === 'Answered')
          this.switchVideo(firstAnsweredQ);
        }

        this.loading = false;
      })
    });
  }

  switchVideo(index : number) {
    if(this.questions[index] && this.questions[index].questionStatus === 'Answered') {
      this.currentQuestion = index + 1;
      this.videoUrl = this.questions[index].candidateAnswer.videoAnswer.videoUrl;
    } 
  }
}
