import { Component } from '@angular/core';
import { SongkickService } from '../services/songkick.service';
import { Event } from '../models/event-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ SongkickService ]
})

export class HomeComponent {
eventsAndBands: any[]=[];


  constructor(private  SongkickService: SongkickService) {}



  executeOnPerformance(shows) {
    console.log("got into executeOnPerformance");
    shows.forEach(function(show) {
      console.log("show date: " + show.start.date);
        show.performance.forEach(function(performance) {
          console.log(" - " + performance.displayName)
        })
    })
  }

  findByDate(location: string, min: string, max: string) {
    this.SongkickService.getLocationId(location).subscribe(response=>{
      this.performancesByLocation(response,min,max)
    });
  }

  performancesByLocation(response: any, min: string, max: string) {
    const id = response.json().resultsPage.results.location[0].metroArea.id
    this.SongkickService.filterByDate(id, min, max).subscribe(response=> {
      this.reFilter(response.json(), min, max);
    })
  }

  reFilter(response: any, min: string, max: string){
    response.resultsPage.results.event.forEach((show)=> {
      if((min<=(show.start.date))&&((show.start.date)<=max)) {
        this.eventsAndBands.push(show);
      }
    });
    this.executeOnPerformance(this.eventsAndBands)
  }




}
