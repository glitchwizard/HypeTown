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
  artistList: any[];


  constructor(private  songkickService: SongkickService, public spotifyAPI: SpotifyService) {}

  locations: Location[] = null;
  artists: Observable<any>;

  executeOnShows(shows) {
    const artistList = [];
    console.log(this.artistList)
    console.log("got into executeOnShows");
    shows.forEach((show)=> {
      console.log("show date: " + show.start.date);
      show.performance.forEach((performance)=> {
        console.log("artist name: " + performance.displayName)
        artistList.push(performance.displayName);
      });
    })
    this.artistList = artistList;
    console.log(this.artistList);
  }


  createPerformanceArray(location: string, min: string, max: string) {
    this.songkickService.findByDate(location, min, max, this)
  }

  getArtistsFromSpotify() {
    return this.spotifyAPI.getToken().map(res => {
      for (let artist of this.artistList) {
        return this.spotifyAPI.searchArtistID(artist, res.access_token)
      }
      // return this.spotifyAPI.searchArtistID("lil", res.access_token)
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
