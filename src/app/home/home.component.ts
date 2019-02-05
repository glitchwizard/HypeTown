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


  constructor(private  songkickService: SongkickService, public spotifyAPI: SpotifyService) {}

locations: Location[] = null;

artists: Observable<any>;
artistIDs: string[];

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


  getArtistsFromSpotify() {
    return this.spotifyAPI.getToken().map(res => {
        return this.spotifyAPI.searchArtistID("lil", res.access_token)
      });
  }

  getIdsFromArtists(){
    this.getArtistsFromSpotify().subscribe((artistListEmitted) => {
      // artistListEmitted.subscribe((a)=> console.log(a.artists))
      console.log(this.artists)
      this.artists=artistListEmitted;
    })
  }

}
