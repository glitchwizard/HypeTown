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
    console.log('something happened 2');

    this.showLocationQuery = location;

    this.findCityIdFromSongkick().subscribe((idResponse) => {
      console.log(idResponse);

      this.songkickService.getShowListByCityIdAndDateRangeFromAPI(idResponse, minDate, maxDate).subscribe((showListResponse) => {
        console.log('-----show list response-----')
        for (let i = 0; i < 5; i++) {
          console.log('---...---');
          console.log(showListResponse.json().resultsPage.results.event[i]);
        }
        return showListResponse.json().resultsPage.results.event

      });
    })
  }
}
