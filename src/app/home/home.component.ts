import { Component } from '@angular/core';
import { SongkickService } from '../services/songkick.service';
import { Event } from '../models/event-model';
import { SpotifyService } from '../services/spotify.service'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ SongkickService, SpotifyService ]
})

export class HomeComponent {
locations: Location[] = null;
eventDetails: any[] = null;
eventsList: Event[] = [];


albums: any[];


  constructor(
    private  SongkickService: SongkickService,
    public spotifyAPI: SpotifyService
  ) {}

  getAccessToken() {
    this.spotifyAPI.getToken()
      .subscribe(res => {
        this.spotifyAPI.searchAlbums("lil", res.access_token)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(res => {
            this.albums = res.albums.items;
            console.log(this.albums);
          });
      });
  }
    findByDate(location: string, min: number, max: number) {
      this.SongkickService.getLocationId(location).subscribe(response=>{
        this.locations = response.json();
        const id = this.locations.resultsPage.results.location[0].metroArea.id
        this.SongkickService.filterByDate(id, min, max).subscribe(response=> {
          this.eventDetails = response.json()
          const events = this.eventDetails.resultsPage.results.event
          events.forEach(event => {
            const eventName = event.displayName;
            const bandName = event.performance[0].artist.displayName
            const newEvent = new Event(eventName, bandName)
            this.eventsList.push(newEvent);
          })
          console.log(this.eventsList)
        })
      });
    }
}
