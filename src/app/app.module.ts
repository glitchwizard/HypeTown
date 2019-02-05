import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LocationsListComponent } from './locations-list/locations-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
