import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SafePipe } from './safe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationsListComponent,
    // SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
