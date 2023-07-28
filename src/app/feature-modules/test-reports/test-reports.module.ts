import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AttemptProcessingComponent } from './attempt-processing/attempt-processing.component';
import { NoReportComponent } from './no-report/no-report.component';
import { ReportAnswerSectionComponent } from './report-answer-section/report-answer-section.component';
import { ReportResponseDetailComponent } from './report-response-detail/report-response-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { SectionBarChartComponent } from './section-bar-chart/section-bar-chart.component';
import { SectionRadarChartComponent } from './section-radar-chart/section-radar-chart.component';
import { TestAttemptReportsComponent } from './test-attempt-reports/test-attempt-reports.component';
import { AccordionModule, NavModule, SharedModule, TabsModule } from '@coreui/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { IprCommonModule } from 'src/app/feature-modules/ipr-common/ipr-common.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AttemptProcessingComponent,
    NoReportComponent,
    ReportAnswerSectionComponent,
    ReportResponseDetailComponent,
    ReportsComponent,
    SectionBarChartComponent,
    SectionRadarChartComponent,
    TestAttemptReportsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgApexchartsModule,
    HighlightModule,
    SharedModule,
    TabsModule,
    NavModule,
    AccordionModule,
    IprCommonModule,
    
  ],
  exports: [
    TestAttemptReportsComponent
  ],
  providers: [
    {
      provide : HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ]
})
export class TestReportsModule { }
