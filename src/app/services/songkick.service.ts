import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { songkickKey } from '../api-keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SongkickService {
eventsAndBands: any[]=[];

  constructor(private http: Http) { }

  getLocationId(query: string) {
    return this.http.get(`https://api.songkick.com/api/3.0/search/locations.json?apikey=${songkickKey}&query=${query}`)
  }

  filterByDate(id, min, max){
    return this.http.get(`https://api.songkick.com/api/3.0/metro_areas/${id}/calendar.json?apikey=${songkickKey}&$min_date=${min}&$max_date=${max}`)
  }


  findByDate(location: string, min: string, max: string, executeOnShows) {
    this.getLocationId(location).subscribe(response=>{
      this.performancesByLocation(response,min,max, executeOnShows)
    });
  }

  performancesByLocation(response: any, min: string, max: string, executeOnShows) {
    const id = response.json().resultsPage.results.location[0].metroArea.id
    this.filterByDate(id, min, max).subscribe(response=> {
      this.reFilter(response.json(), min, max, executeOnShows);
    })
  }

  reFilter(response: any, min: string, max: string, executeOnShows){
    response.resultsPage.results.event.forEach((show)=> {
      if((min<=(show.start.date))&&((show.start.date)<=max)) {
        this.eventsAndBands.push(show);
      }
    });
    executeOnShows(this.eventsAndBands)
  }
}

// curl -H "Authorization: Basic MTdmMzQyNDU0OTA3NGM2Mjk2MTkzZmVjNzA1MmE3YWQ6ZGIwOTkxZjAzMzViNDRkNjg3ZGE1MzZmNWY5ZDIwYjE=" -d grant_type=AQBResx2bIA9ALY5lG5icOHxk7_B4U3lhF0m-lgff7tUYGUEjrHzdVevoMrf4Y7GI8UDHk29TIegmUjzOBsbUunegGIHD4aCcHTYr9Si1oha71ToRw4y5jl_OKtLyigKJdfCs-9XjMAS9LF_xeUoQVat9DvcWWvilNAkwY1pn6eqAJU3M-uGedLps3iDRBawAWaZurZUG1YSBC6KVjCWVX7u9dAUrKURY5KcWFI-d code=MQCbtKe...44KN -d redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback https://accounts.spotify.com/api/token
