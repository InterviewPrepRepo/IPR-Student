import { Component, Input, OnInit, OnChanges } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ChartComponent,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-section-chart',
  templateUrl: './section-chart.component.html',
  styleUrls: ['./section-chart.component.scss']
})
export class SectionChartComponent implements OnInit, OnChanges {
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
    }

  }
  ngOnInit(): void {
    this.chartOptions.series[0].data = this.sectionAverages;
    this.chartOptions.xaxis.categories = this.sectionNames;
  }

  ngOnChanges() : void {
    console.log('chart on changes: something changed');
  }

}

