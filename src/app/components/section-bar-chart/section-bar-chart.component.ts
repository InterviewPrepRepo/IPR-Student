import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle
};
@Component({
  selector: 'app-section-bar-chart',
  templateUrl: './section-bar-chart.component.html',
  styleUrls: ['./section-bar-chart.component.scss']
})
export class SectionBarChartComponent implements OnInit {
  @Input() sectionNames: string[] = [];
  @Input() sectionAverages: number[] = [];
  public chartOptions: ChartOptions = {
    series: [
      {
        name: "basic",
        data: []
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: "Section Score Analysis"
    },
    xaxis: {
      categories: []
    }
  };

  constructor() {
  }
  ngOnInit(): void {
    this.chartOptions.series[0].data = this.sectionAverages;
    this.chartOptions.xaxis.categories = this.sectionNames;
  }

}
