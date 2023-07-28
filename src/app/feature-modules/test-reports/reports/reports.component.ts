import { Component, Input } from '@angular/core';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import ChartData from 'src/app/models/chartData';
@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  @Input() attemptId: number = 0;
  @Input() questions: TestAttemptQuestion[] = [];
  @Input() testScore: number = 0;
  @Input() scoreData: ChartData = {
    //set keys array for the chart to consume
    keys: [],
    values: []
  };
  @Input() allAttemptsScore: {name: string, data: number[]}[] = [];
  
  currentQuestion: number = 1;
  videoUrl: string = "";

  chartOptions: any = {};

  constructor() { }
}
