import { Component, OnInit, Input } from '@angular/core';
import { ImochaService } from '../../services/imocha-service/imocha.service';
import TestAttemptQuestion from '../../models/testAttemptQuestion';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import User from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import TestInvitation from 'src/app/models/testInvitation';

interface ChartData {
  keys: string[]
  values: number[]
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @Input() attemptId: number = 0;
  
  currentQuestion: number = 1;
  videoUrl: string = "";
  questions: TestAttemptQuestion[] = [];
  loading: boolean = true;
  testScore: number = 0;
  scoreData: ChartData = {
    //set keys array for the chart to consume
    keys: [],
    values: []
  };

  chartOptions: any = {};

  constructor(private imocha: ImochaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.imocha.getQuestionsByTestAttemptId(this.attemptId).subscribe((res) => {
        this.questions = res.result;
        //create a map for each section with the score candidate got for the questions in the section
        //and also calculate total score while we're at it
        const sectionMap: Record<string, number[]> = {};
        let scoreSum = 0;
        let totalSection = 0;
        this.questions.map((question) => {
          // don't include negatives count it as does not exist
          if (question.score >= 0) {
            scoreSum += question.score;
            totalSection++;
            if (question.sectionName in sectionMap) {
              sectionMap[question.sectionName].push(question.score);
            }
            else {
              sectionMap[question.sectionName] = [question.score];
            }
          }
        })
        this.testScore = scoreSum / totalSection;

        //Calculate average score for each section name
        Object.keys(sectionMap).map((key) => {
          let average = sectionMap[key].reduce((a, b) => a + b, 0) / sectionMap[key].length;
          //only include sections with positive average
          this.scoreData.keys.push(key);
          this.scoreData.values.push(average);
        });
        this.loading = false;
      })
  }

}
