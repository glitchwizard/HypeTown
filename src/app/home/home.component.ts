import { Component } from '@angular/core';
import { SongkickService } from '../services/songkick.service';
import { Event } from '../models/event-model';
import { SpotifyService } from '../services/spotify.service'
import { Artist } from '../models/artist-model';
import { Observable } from 'rxjs/Observable';



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
artists: Observable<any>;
artistIDs: string[];


  constructor(
    private  SongkickService: SongkickService,
    public spotifyAPI: SpotifyService
  ) {}

  getArtistsFromSpotify() {
    return this.spotifyAPI.getToken().map(res => {
        return this.spotifyAPI.searchArtistID("lil", res.access_token)
      });
    // this.spotifyAPI.getToken()
    //   .subscribe(res => {
    //     this.spotifyAPI.searchArtistID("lil", res.access_token)
    //       .subscribe(res => {
    //         this.artists = res.artists.items;
    //         // console.log(this.artists);
    //         return this.artists = res.artists.items;
    //       });
    //   });
  }

  getIdsFromArtists(){
    this.getArtistsFromSpotify().subscribe((artistListEmitted) => {
      // artistListEmitted.subscribe((a)=> console.log(a.artists))
console.log(this.artists)
this.artists=artistListEmitted;
      // for (let artist of artistListEmitted) {
      //   this.artistIDs.push(artist.id)
      //   console.log(artist.id);
      // }

    })
    // console.log(this.artistIDs);
  }

  findByDate(location: string, min: number, max: number) {
    // this.SongkickService.getLocationId(location).subscribe(response=>{
    //   this.locations = response.json();
    //   const id = this.locations.resultsPage.results.location[0].metroArea.id
    //   this.SongkickService.filterByDate(id, min, max).subscribe(response=> {
    //     this.eventDetails = response.json()
    //     const events = this.eventDetails.resultsPage.results.event
    //     events.forEach(event => {
    //       const eventName = event.displayName;
    //       const bandName = event.performance[0].artist.displayName
    //       const newEvent = new Event(eventName, bandName)
    //       this.eventsList.push(newEvent);
    //     })
    //     console.log(this.eventsList)
    //   })
    // });
  }
}
