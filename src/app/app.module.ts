import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewCmpComponent } from './feat/new-cmp/new-cmp.component';
import { FormsModule } from '@angular/forms';
import { PersonCardComponent } from './feat/person-card/person-card.component';
import { DisplayComponent } from './feat/display/display.component';
import { Step1Component } from './feat/rxjs/step1/step1.component';
import { Step2Component } from './feat/rxjs/step2/step2.component';
import { NgChartsModule } from 'ng2-charts';
import { SwComponent } from './feat/rxjs/sw/sw.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NewCmpComponent,
    PersonCardComponent,
    DisplayComponent,
    Step1Component,
    Step2Component,
    SwComponent,
  ],
  imports: [BrowserModule, FormsModule, NgChartsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
