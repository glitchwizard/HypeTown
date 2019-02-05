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

  constructor(private http: Http) { }

  getLocationId(query: string) {
    return this.http.get(`https://api.songkick.com/api/3.0/search/locations.json?apikey=${songkickKey}&query=${query}`)
  }

  filterByDate(id, min, max){
    return this.http.get(`https://api.songkick.com/api/3.0/metro_areas/${id}/calendar.json?apikey=${songkickKey}&$min_date=${min}&$max_date=${max}&per_page=10`)
  }


  getToken() {
    return this.http.get(`https://accounts.spotify.com/authorize?response_type=token&client_id=17f3424549074c6296193fec7052a7ad&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback&scope=playlist-read-private&show-dialog`)
  }
  getSpotifyPlaylist() {
    return this.http.get(`https://api.spotify.com/v1/users/devinsweeting/playlists`)
  }
}

// curl -H "Authorization: Basic MTdmMzQyNDU0OTA3NGM2Mjk2MTkzZmVjNzA1MmE3YWQ6ZGIwOTkxZjAzMzViNDRkNjg3ZGE1MzZmNWY5ZDIwYjE=" -d grant_type=AQBResx2bIA9ALY5lG5icOHxk7_B4U3lhF0m-lgff7tUYGUEjrHzdVevoMrf4Y7GI8UDHk29TIegmUjzOBsbUunegGIHD4aCcHTYr9Si1oha71ToRw4y5jl_OKtLyigKJdfCs-9XjMAS9LF_xeUoQVat9DvcWWvilNAkwY1pn6eqAJU3M-uGedLps3iDRBawAWaZurZUG1YSBC6KVjCWVX7u9dAUrKURY5KcWFI-d code=MQCbtKe...44KN -d redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback https://accounts.spotify.com/api/token
