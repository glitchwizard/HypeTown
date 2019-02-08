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

  getLocationIdFromAPI(query: string) {
    return this.http.get(`https://api.songkick.com/api/3.0/search/locations.json?apikey=${songkickKey}&query=${query}`).map((response: Response) => response.json())
  }

  getShowListByCityIdAndDateRangeFromAPI(id, min, max){
    return this.http.get(`https://api.songkick.com/api/3.0/metro_areas/${id}/calendar.json?apikey=${songkickKey}&$min_date=${min}&$max_date=${max}`).map((response: Response) => response.json())
  }
}
