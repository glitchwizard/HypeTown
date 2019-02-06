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
      return this.artistList;
    });
  }

  generateArtistIdsFromAritstList(){
    let artistList: string[] = ["loren north", "Randy Emata", "Dyekho", "The Lemon Twigs", "The Toasters"]
    this.spotifyService.getToken().subscribe((accessTokenResponse) => {
      this.spotifyService.searchArtistID("The Toasters", accessTokenResponse.access_token)
      .subscribe((response) => {
        console.log(response.artists.items[0].name)
        console.log(response.artists.items[0].id)
      });
    })
  }

//   getArtistsFromSpotify() {
//   return this.spotifyAPI.getToken().map(res => {
//       return this.spotifyAPI.searchArtistID("lil", res.access_token)
//     });
// }

}
