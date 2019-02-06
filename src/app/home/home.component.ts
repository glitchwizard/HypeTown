import { Component } from '@angular/core';
import { SongkickService } from '../services/songkick.service';
import { Event } from '../models/event-model';
import { SpotifyService } from '../services/spotify.service'
import { Artist } from '../models/artist-model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ SongkickService, SpotifyService ]
})

export class HomeComponent {
  public showLocationQuery: string;
  public showLocationIdResponse: Response;
  public showLocationId: string;
  public showLocation$: Observable<any>;

  constructor(private  songkickService: SongkickService, public spotifyService: SpotifyService, public client: HttpClient) {}

  findCityIdFromSongkick() {
    console.log('something happened');

    this.showLocation$ = this.songkickService.getLocationIdFromAPI(this.showLocationQuery);

    return this.songkickService.getLocationIdFromAPI(this.showLocationQuery).map((response) => {
      this.showLocationId = response.resultsPage.results.location[0].metroArea.id;
      return response.resultsPage.results.location[0].metroArea.id
    })
  }

//This function should change to use map instead of subscribe, we use subecribe for troubleshooting to log the outputs

  findListOfShowsByCityIdAndDateRange(location:string, minDate: string, maxDate: string) {
    console.log('something happened 2')
    this.showLocationQuery = location;
    this.findCityIdFromSongkick().subscribe((idResponse) => {
      console.log(idResponse);
      this.songkickService.getShowListByCityIdAndDateRangeFromAPI(idResponse, minDate, maxDate).subscribe((showListResponse)=>{
        console.log('-----show list response-----')
        for (let i = 0; i < showListResponse.json().resultsPage.results.event.length; i++) {
            console.log(showListResponse.json().resultsPage.results.event[i]);
        }
      });
    })
  }



  // executeOnShows(shows) {
  //   shows.forEach((show)=> {
  //     show.performance.forEach((performance)=> {
  //       this.artistObjects.push(new Artist(performance.displayName));
  //     });
  //   })
  //
  //   this.artistObjects.forEach(artist => {
  //     return this.getIdFromArtist(artist.artistName);
  //   })
  // }
  //
  // getIdFromArtist(artistName: string){
  //   this.getArtistFromSpotify(artistName).subscribe(artistListEmitted => {
  //     // artistListEmitted.subscribe((a)=> console.log(a.artists))
  //     console.log("getIdFromArtists: artistLastEmitted");
  //     console.log(artistListEmitted);
  //     return artistListEmitted;
  //   })
  // }
  //
  // getArtistFromSpotify(artistName: string) {
  //   return this.spotifyService.getToken().then(response => {// error don't know what to do with this thing
  //     console.log('Final step');
  //     console.log(this.spotifyService.searchArtistID(artistName, response.access_token))
  //     console.log()
  //     return this.spotifyService.searchArtistID(artistName, response.access_token)
  //   });
  // getArtistsFromSpotify() {
  //   return this.spotifyService.getToken().map(res => {
  //     for (let artist of this.artistList) {
  //       return this.spotifyService.searchArtistID(artist, res.access_token)
  //     }
  //   });
  // }
  }
