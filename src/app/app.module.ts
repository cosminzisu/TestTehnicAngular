import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersoaneComponent } from './persoane/persoane.component';
import { MasiniComponent } from './masini/masini.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './masini/filter.pipe';
import { FilterPipePers } from './persoane/filter.pipepers';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PersoaneComponent,
    MasiniComponent,
    FilterPipe,
    FilterPipePers 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
