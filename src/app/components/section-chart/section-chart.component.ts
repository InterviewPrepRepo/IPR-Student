import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions } from '../../models/chartOptions';

@Component({
  selector: 'app-section-chart',
  templateUrl: './section-chart.component.html',
  styleUrls: ['./section-chart.component.scss']
})
export class SectionChartComponent implements OnChanges {
  @Input() sectionNames: string[] = [];
  @Input() sectionAverages: number[] = [];
  @Input() chartOptions : ChartOptions = {
    series: [
      {
        name: "Section Average",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "radar"
    },
    title: {
      text: "Performance Analysis"
    },
    xaxis: {
      categories: []
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

}

