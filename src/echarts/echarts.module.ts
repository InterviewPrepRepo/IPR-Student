import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';



@NgModule({
  declarations: [
    BarChartComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    BarChartComponent
  ]
})
export class EchartsModule { }
