import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle,
  fill: ApexFill
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
        name: "Section Average",
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
    },
    fill: {
      colors: [
        function (input: { value: number, seriesIndex: unknown, w: unknown }): string {
          if (input.value <= 25) {
            return '#ff0000'
          } else if (input.value >= 26 && input.value <= 50) {
            return '#ffa500'
          } else if (input.value >= 51 && input.value <= 75) {
            return '#0000FF'
          } else {
            return '#00ff00'
          }
        }
      ]
    }
  };

  constructor() {
  }
  ngOnInit(): void {
    this.chartOptions.series[0].data = this.sectionAverages;
    this.chartOptions.xaxis.categories = this.sectionNames;
  }

}
