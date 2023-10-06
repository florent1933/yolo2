import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewCmpComponent } from './feat/new-cmp/new-cmp.component';
import { FormsModule } from '@angular/forms';
import { PersonCardComponent } from './feat/person-card/person-card.component';

@NgModule({
  declarations: [AppComponent, NewCmpComponent, PersonCardComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
