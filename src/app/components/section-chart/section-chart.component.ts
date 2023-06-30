import { Component, Input, OnInit, ViewChild} from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from "ng-apexcharts";
import { NotifyService } from 'src/app/services/notify-service/notify.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-section-chart',
  templateUrl: './section-chart.component.html',
  styleUrls: ['./section-chart.component.scss']
})
export class SectionChartComponent implements OnInit {
  @Input() sectionNames: string[] = [];
  @Input() allAttemptsScore: {name: string, data: number[]}[] = [];

  @ViewChild('apexRadarChart') chart! : ChartComponent;

  constructor(private notify : NotifyService) { }

  chartOptions: ChartOptions = {
    series: [
      {
        name: "Section Average",
        data: []
      }
    ],
    chart: {
      height: 600,
      type: "radar"
    },
    title: {
      text: "Performance Analysis"
    },
    xaxis: {
      categories: []
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4
    }

  }
  ngOnInit(): void {
    this.chartOptions.series = this.allAttemptsScore;
    this.chartOptions.xaxis.categories = this.sectionNames;

    this.notify.tabSwitchObservable$.subscribe((tabIndex : number) => {
      this.chart.render();
    })
  }

}

