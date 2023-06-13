import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import { Config } from 'src/app/models/iprConfig';
import { UtilService } from 'src/app/services/util-service/util.service';

@Component({
  selector: 'app-report-response-detail',
  templateUrl: './report-response-detail.component.html',
  styleUrls: ['./report-response-detail.component.scss']
})
export class ReportResponseDetailComponent implements OnInit {
  @Input() questions: TestAttemptQuestion[] = []


  displayCorrectAnswer : boolean = true;
  categorizedQuestions : Record<string, TestAttemptQuestion[]> = {};

  constructor(private local:LocalStorageService, private util: UtilService) { }
  ngOnInit(): void {
    if(this.questions && this.questions.length > 0) {

      const config = this.local.get('ipr_config') as Config;
      if(config) {
        this.displayCorrectAnswer = config.displayCorrectAnswer ?? true;
      }
      else {
        this.displayCorrectAnswer = true;
      }
      this.categorizedQuestions = this.util.categorizeByProperty(this.questions, 'sectionName')
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
