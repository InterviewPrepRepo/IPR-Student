import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
@Component({
  selector: 'echarts-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() sectionNames: string[] = [];
  @Input() sectionAverages: number[] = [];
  options!: EChartsOption;
  constructor() {}

  ngOnInit(): void {
    console.log(this.sectionAverages, this.sectionNames)
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 20; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: [
          {
            name: 'Beginner (0-25)'
          }, 
          {
            name: 'Intermediate (26-50)'
          }, 
          {
            name: 'Experienced (51-75)'
          },
          {
            name: 'Proficient(76-100)'
          }
        ],
        align: 'left',
      },
      grid: { containLabel: true },
      tooltip: {},
      xAxis: {
        min: 0,
        max: 100
      },
      yAxis: {
        data: this.sectionNames,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: this.sectionAverages,
          animationDelay: idx => idx * 10,
        },
        {
          name: 'Beginner (0-25)',
          type: 'bar',
          data: []
        },
        {
          name: 'Intermediate (26-50)',
          type: 'bar',
          data: []
        },
        {
          name: 'Experienced (51-75)',
          type: 'bar',
          data: []
        },
        {
          name: 'Proficient(76-100)',
          type: 'bar',
          data: []
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }
}
