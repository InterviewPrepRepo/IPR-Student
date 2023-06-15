import { Component } from '@angular/core';
import { ImochaService } from 'src/app/services/imocha-service/imocha.service';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import TestInvitation from 'src/app/models/testInvitation';
import { forkJoin } from 'rxjs';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import { ChartOptions } from '../../models/chartOptions';
@Component({
  selector: 'app-test-attempt-reports',
  templateUrl: './test-attempt-reports.component.html',
  styleUrls: ['./test-attempt-reports.component.scss']
})
export class TestAttemptReportsComponent {

  constructor(private imocha: ImochaService, private auth: AuthService, private activatedRoute: ActivatedRoute) {}
  activeTabIndex = 2;
  attempts : TestInvitation[] = [];

  
  chartOptions: ChartOptions = {
    series: [],
    chart: {
      height: 650,
      type: "radar"
    },
    title: {
      text: "Performance Analysis"
    },
    xaxis: {
      categories: ['Interview Prep','SQL', 'Java', 'angular']
    }
  }

  attemptDetails : Record<number, TestAttemptQuestion[]> = {};
  ngOnInit(): void {
    const currentUser: User = this.auth.getCurrentUser();
    if(currentUser && currentUser.email) {
      this.activatedRoute.queryParams.subscribe(({ testId }) => {
        this.imocha.getTestAttempts(testId).subscribe((res) => {
          this.attempts = res.filter((testAttempt : TestInvitation) => testAttempt.email === currentUser.email)

          console.log(this.attempts);
          //For each attempt we have for this particular test Id and user email, we need to get the details for them
          let attemptDetailRequestArr = [];
          //Assemble request array of all attempts so we can forkjoin
          for(let attempt of this.attempts) {
            attemptDetailRequestArr.push(this.imocha.getQuestionsByTestAttemptId(attempt.testInvitationId));
          }

          //send HTTP request to individually fetch attempt details (/question endpoint) 
          forkJoin(attemptDetailRequestArr).subscribe((responseArr) => {
            responseArr.forEach((response, index) => {
              this.attemptDetails[response.result[0].testInvitationId] = response.result;

              //This is key/value object to render the radar graph for this particular attempt
              const testAttemptSectionScore = this.calculateSectionAverage(response.result);
              console.log(testAttemptSectionScore);
              this.chartOptions.xaxis.categories = ['Interview Prep','SQL', 'Java', 'angular'];
              // if(this.chartOptions.xaxis.categories.length <= 0) {
              // }
              this.chartOptions.series.push({
                name: 'Attempt' + (index + 1),
                data: testAttemptSectionScore.values
              });
            })
          })
        })
      })
    }
  }

  private calculateSectionAverage(questions : TestAttemptQuestion[]) : {keys: string[], values: number[]}{
    //create a map for each section with the score candidate got for the questions in the section
    //and also calculate total score while we're at it
    const sectionMap: Record<string, number[]> = {};
    let scoreSum = 0;
    let totalSection = 0;
    let scoreData : { keys: string[], values: number[] } = {
      keys: [],
      values: []
    }

    questions.map((question) => {
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

    //Calculate average score for each section name
    Object.keys(sectionMap).map((key) => {
      let average = sectionMap[key].reduce((a, b) => a + b, 0) / sectionMap[key].length;
      //only include sections with positive average
      scoreData.keys.push(key);
      scoreData.values.push(average);
    });

    return scoreData;
  }

  activeTab(i : number): void {
    this.activeTabIndex = i;
  }
}

