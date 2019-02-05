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


  constructor(private  songkickService: SongkickService) {}



  executeOnShows(shows) {
    console.log("got into executeOnShows");
    shows.forEach(function(show) {
      console.log("show date: " + show.start.date);
      show.performance.forEach(function(performance) {
        console.log(" - " + performance.displayName)
      })
    })
  }

createPerformanceArray(location: string, min: string, max: string) {
  this.songkickService.findByDate(location, min, max, this.executeOnShows)
}


}
