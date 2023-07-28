import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { TestLoadingComponent } from './test-loading/test-loading.component';



@NgModule({
  declarations: [
    LoadingComponent,
    TestLoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    TestLoadingComponent
  ]
})
export class IprCommonModule { }
