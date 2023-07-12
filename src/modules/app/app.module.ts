import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IprCommonModule } from 'src/modules/ipr-common/ipr-common.module';
import { TestReportsModule } from 'src/modules/test-reports/test-reports.module';
import { QuizModule } from 'src/modules/quiz/quiz.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InvitePageComponent } from './components/invite-page/invite-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { IconModule, IconSetService } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvitePageComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IprCommonModule,
    TestReportsModule,
    QuizModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    IconSetService
  ]
})
export class AppModule { }