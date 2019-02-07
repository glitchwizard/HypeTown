import { Component } from '@angular/core';
import { SongkickService } from '../services/songkick.service';
import { Event } from '../models/event-model';
import { SpotifyService } from '../services/spotify.service'
import { Artist } from '../models/artist-model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { SlideUpandDown } from './slideupanddown';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ SongkickService, SpotifyService ],
  animations: [SlideUpandDown]
})

export class HomeComponent {
  public showLocationQuery: string;
  public showLocationId: string;
  public showLocation$: Observable<any>;
  public showlocations$: Observable<any[]>;
  public showMaxDate: string;
  public showMinDate: string;
  public artistList: string[] = [];
  public showArtists$: Observable<any[]>;
  public artistToQuery: string;
  public spotifyArtistListFromQuery = [];
  public artistIdListFromSpotify: string[] = [];
  animationState="out";


  constructor(private  songkickService: SongkickService, public spotifyService: SpotifyService, public client: HttpClient) {}

  findCityIdFromSongkick() {
    console.log('findCityIdFromSongkick() running...');
    this.showLocation$ = this.songkickService.getLocationIdFromAPI(this.showLocationQuery);

    return this.songkickService.getLocationIdFromAPI(this.showLocationQuery).map((response) => {
      this.showLocationId = response.resultsPage.results.location[0].metroArea.id;
      return response.resultsPage.results.location[0].metroArea.id;
    });
  }

//This function should change to use map instead of subscribe, we use subscribe for troubleshooting to log the outputs

  findListOfShowsByCityIdAndDateRange() {
    console.log('findListOfShowsByCityIdAndDateRange() running...');
    return this.findCityIdFromSongkick()
    .pipe(
      flatMap((idResponse) => {
      return this.songkickService.getShowListByCityIdAndDateRangeFromAPI(idResponse, this.showMinDate, this.showMaxDate)
        .map((showListResponse) => {
          return showListResponse.resultsPage.results.event
        });
      })
    );
  }

  generateArrayOfHeadlinerPerformances(location:string, minDate: string, maxDate: string){
    console.log('generateArrayOfHeadlinerPerformances() running...');
    this.showLocationQuery = location;
    this.showMinDate = minDate;
    this.showMaxDate = maxDate;
    return this.findListOfShowsByCityIdAndDateRange().subscribe((showListResponse) => {
      for (let i = 0; i < 5; i++) {
        showListResponse[i].performance.forEach((artist) => {
          if(artist.billing == "headline") {
            this.artistList.push(artist.displayName);
          }
        });
      }
      console.log('songkick final return:');
      console.log(this.artistList);
      return this.artistList;
    });
  }

  toggle(divName: string) {
    if(divName === "results")
    {
       this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  generateArtistIdFromArtist(artistName) {
      return this.spotifyService.getToken().pipe(
        flatMap((accessTokenResponse) => {
          return this.spotifyService.searchArtistID(artistName, accessTokenResponse.access_token);
               })
      );
  }
// Populates this.artistIdListFromSpotify with first return of spotify artist query - which includes artist.name and artist.id -- for a spotify artist search by ID
  getAllSpotifyArtistObjects() { 
    const APICallArray = [];
    // const dummyArtistList = ['loren north', 'Randy Emata', 'Dyekho', 'The Lemon Twigs', 'The Toasters'];
    const ArtistOutputArray = [];

    for (let i = 0; i < this.artistList.length; i++) {
      this.artistToQuery = this.artistList[i];
      APICallArray.push(this.generateArtistIdFromArtist(this.artistList[i]));
    }

    for (let i = 0; i < APICallArray.length; i++) {
        APICallArray[i].subscribe((response) => {
          console.log(response);
          ArtistOutputArray.push(response);
        });
    }
    this.spotifyArtistListFromQuery = ArtistOutputArray;
    console.log(ArtistOutputArray);
    return ArtistOutputArray;
  }
}
