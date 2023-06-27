import { Component, Input, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from "ng-apexcharts";

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
  @Input() sectionAverages: number[] = [];
  chartOptions: ChartOptions = {
    series: [
      {
        name: "Section Average",
        data: []
      }
    ],
    chart: {
      height: 450,
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
    this.chartOptions.series[0].data = this.sectionAverages;
    this.chartOptions.xaxis.categories = this.sectionNames;
  }

}

