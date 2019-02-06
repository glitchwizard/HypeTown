import { Component } from '@angular/core';
import { SongkickService } from '../services/songkick.service';
import { Event } from '../models/event-model';
import { SpotifyService } from '../services/spotify.service'
import { Artist } from '../models/artist-model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ SongkickService, SpotifyService ]
})

export class HomeComponent {
  public showLocationQuery: string;
  public showLocationId: string;
  public showLocation$: Observable<any>;
  public showlocations$: Observable<any[]>;
  public showMaxDate: string;
  public showMinDate: string;
  public artistList: string[] = [];
  public artistToQuery: string;
  public spotifyArtistListFromQuery: string[] = [];
  public artistIdListFromSpotify: string[] = [];


  constructor(private  songkickService: SongkickService, public spotifyService: SpotifyService, public client: HttpClient) {}

  findCityIdFromSongkick() {
    console.log('findCityIdFromSongkick() running...');
    this.showLocation$ = this.songkickService.getLocationIdFromAPI(this.showLocationQuery);

    return this.songkickService.getLocationIdFromAPI(this.showLocationQuery).map((response) => {
      this.showLocationId = response.resultsPage.results.location[0].metroArea.id;
      return response.resultsPage.results.location[0].metroArea.id
    })
  }

//This function should change to use map instead of subscribe, we use subecribe for troubleshooting to log the outputs

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
    )
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
        })
      }
      console.log('songkick final return:')
      console.log(this.artistList);
      return this.artistList;
    });
  }

  generateArtistIdFromAritstList(){
    return this.spotifyService.getToken().pipe(
      flatMap((accessTokenResponse) => {
        return this.spotifyService.searchArtistID(this.artistToQuery, accessTokenResponse.access_token)
        .map((response) => {
          response.artists.items.forEach((spotifyArtist) => {
            this.spotifyArtistListFromQuery.push(spotifyArtist.name);
          })
          let artistMatchIndexPosition = this.spotifyArtistListFromQuery.findIndex((artistToQueryNow) => {
            return artistToQueryNow == this.artistToQuery;
          });
          if (artistMatchIndexPosition >= 0 ) {
             this.artistIdListFromSpotify.push(response.artists.items[artistMatchIndexPosition].id)
             return response.artists.items[artistMatchIndexPosition].id
          }
        })
      })
    )
  }

  getAllSpotifyArtistIds(){
    let dummyArtistList = ["loren north", "Randy Emata", "Dyekho", "The Lemon Twigs", "The Toasters"];
      this.artistToQuery = dummyArtist;
      console.log('query on: ' + this.artistToQuery);
      this.generateArtistIdFromAritstList().subscribe((response) => {
        console.log('response');
        console.log(response);
        dummyArtistList.forEach((dummyArtist) => {
        })
      });
    console.log(this.artistIdListFromSpotify);

  }
}

  // generateArtistIdsFromAritstList(){
  //   let artistList: string[] = ["loren north", "Randy Emata", "Dyekho", "The Lemon Twigs", "The Toasters"]
  //   this.spotifyService.getToken().pipe(
  //     flatMap((accessTokenResponse) => {
  //       return this.spotifyService.searchArtistID("The Toasters", accessTokenResponse.access_token)
  //       .map((response) => {
  //         console.log('things are happening');
  //         console.log(response.artists.items);
  //         // response.artists.items.forEach((singleSpotifyArtistQueryResponse) => {
  //         //   this.spotifyArtistQueryReturn.push(singleSpotifyArtistQueryResponse)
  //         // });
  //         // console.log(this.spotifyArtistQueryReturn);
  //       });
  //     })
  //   )
  // }

//   getArtistsFromSpotify() {
//   return this.spotifyAPI.getToken().map(res => {
//       return this.spotifyAPI.searchArtistID("lil", res.access_token)
//     });
// }
