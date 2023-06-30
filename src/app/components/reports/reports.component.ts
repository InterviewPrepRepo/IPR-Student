import { Component, OnInit, Input } from '@angular/core';
import { ImochaService } from '../../services/imocha-service/imocha.service';
import TestAttemptQuestion from '../../models/testAttemptQuestion';
import { UtilService } from 'src/app/services/util-service/util.service';
import ChartData from 'src/app/models/chartData';
@Component({
  selector: 'app-reports',
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
