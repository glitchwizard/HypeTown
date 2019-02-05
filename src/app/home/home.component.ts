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
locations: any[]=null;
eventDetails: any[]=null;
eventsAndBands: Event[]=[];


  constructor(private  SongkickService: SongkickService) {}

  // getLocationById(location: string) {
  //     this.SongkickService.getLocationId(location).subscribe(response=>{
  //     this.locations = response.json();
  //     console.log("Locations below:")
  //     const city = this.locations.resultsPage.results.location[0].metroArea.displayName;
  //     const id = this.locations.resultsPage.results.location[0].metroArea.id
  //     console.log(city)
  //     console.log(id);
  //     const userLocation = new Location(city, id)
  //     console.log(userLocation)
  //     });
  //   }

    findByDate(location: string, min: number, max: number) {
      this.SongkickService.getLocationId(location).subscribe(response=>{
        this.locations = response.json();
        const id = this.locations.resultsPage.results.location[0].metroArea.id
        this.SongkickService.filterByDate(id, min, max).subscribe(response=> {
        this.eventDetails = response.json()

        const events = this.eventDetails.resultsPage.results.event
        events.forEach(event => {
          const eventName = event.displayName;
          const newEvent = new Event(eventName)
          this.eventsAndBands.push(newEvent);
        })
        console.log("eventList" + this.eventsAndBands);
        })
      });
    }

}

// createMasterLocations(locations: any) {
//   locations.resultsPage.results.location.forEach(location => {
//     const city = location.city.displayName
//     const newLocation = new Location(city)
//   })
// }
