import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexFill,
  ApexLegend,
  ChartComponent
} from "ng-apexcharts";
import { NotifyService } from 'src/app/services/notify-service/notify.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle,
  fill: ApexFill,
  legend: ApexLegend
};
@Component({
  selector: 'report-section-bar-chart',
  templateUrl: './section-bar-chart.component.html',
  styleUrls: ['./section-bar-chart.component.scss']
})
export class SectionBarChartComponent implements OnInit {
  @Input() sectionNames: string[] = [];
  @Input() sectionAverages: number[] = [];
  @ViewChild('apexBarChart') chart! : ChartComponent;

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
    yaxis: {
      min: 0,
      max: 100
    },
    fill: {
      colors: [
        function (input: { value: number, seriesIndex: unknown, w: unknown }): string {
          if (input.value <= 25) {
            return '#ff4560'
          } else if (input.value >= 26 && input.value <= 50) {
            return '#feb019'
          } else if (input.value >= 51 && input.value <= 75) {
            return '#008FFB'
          } else {
            return '#00e396'
          }
        }
      ]
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 400,
      inverseOrder: true,
      customLegendItems: ['Proficient (76-100)', 'Experienced (51-75)', 'Intermediate (26-50)', 'Beginner (0-25)'],
      labels: {
        colors: 'rgb(51, 56, 63)'
      },
      markers: {
        fillColors: ['#00E396', '#008FFB', '#FEB019', '#ff4560']
      }
    }
  };

  constructor(private notify : NotifyService) { }

  ngOnInit(): void {
    this.chartOptions.series[0].data = this.sectionAverages;
    this.chartOptions.xaxis.categories = this.sectionNames;

    this.notify.tabSwitchObservable$.subscribe((tabIdx : number) => {
      this.chart.render();
    })
  }
}
