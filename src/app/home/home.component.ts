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
  artistList: any[] = [];
  artistObjects: Artist[] = [];


  constructor(private  songkickService: SongkickService, public spotifyService: SpotifyService) {}

  locations: Location[] = null;
  artists: Observable<any>;
  // test
  executeOnShows(shows) {
    shows.forEach((show)=> {
      show.performance.forEach((performance)=> {
        this.artistObjects.push(new Artist(performance.displayName));
      });
    })

    this.artistObjects.forEach(artist => {
      console.log('');
      console.log('-------------------');
      console.log('forEach Artist.artistName');
      console.log('artist.artistName: ' + artist.artistName);
      console.log(this.getIdFromArtist(artist.artistName));
      return this.getIdFromArtist(artist.artistName);
    })
  }

  getIdFromArtist(artistName: string){
    this.getArtistFromSpotify(artistName).subscribe(artistListEmitted => {
      // artistListEmitted.subscribe((a)=> console.log(a.artists))
      console.log("getIdFromArtists: artistLastEmitted");
      console.log(artistListEmitted);
      return artistListEmitted;
    })
  }

  getArtistFromSpotify(artistName: string) {
    return this.spotifyService.getToken().then(response => {// error don't know what to do with this thing
      console.log('Final step');
      console.log(this.spotifyService.searchArtistID(artistName, response.access_token))
      console.log()
      return this.spotifyService.searchArtistID(artistName, response.access_token)
    });
  }

  createPerformanceArray(location: string, minDate: string, maxDate: string) {
    this.songkickService.findShowsByDate(location, minDate, maxDate, this)
  }

  // getArtistsFromSpotify() {
  //   return this.spotifyService.getToken().map(res => {
  //     for (let artist of this.artistList) {
  //       return this.spotifyService.searchArtistID(artist, res.access_token)
  //     }
  //   });
  // }



}
