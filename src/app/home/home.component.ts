import { Component, OnInit } from '@angular/core';
import { SongkickService } from '../services/songkick.service';
import { Location } from '../models/location-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ SongkickService ]
})

export class HomeComponent implements OnInit {
locations: any[]=null;
eventDetails: any[]=null;


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
      console.log(location)
      console.log(min)
      console.log(max)
        this.SongkickService.getLocationId(location).subscribe(response=>{
          this.locations = response.json();
          const id = this.locations.resultsPage.results.location[0].metroArea.id
          console.log(id)
          this.SongkickService.filterByDate(id, min, max).subscribe(response=> {
          this.eventDetails = response.json()
          console.log(this.eventDetails)
          })
        // const userLocation = new Location(city, id)
        // console.log(userLocation)
        });
      }

  ngOnInit() {
  }

}

// createMasterLocations(locations: any) {
//   locations.resultsPage.results.location.forEach(location => {
//     const city = location.city.displayName
//     const newLocation = new Location(city)
//   })
// }
