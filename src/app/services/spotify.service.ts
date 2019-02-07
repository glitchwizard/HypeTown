import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import {spotifyAPIclientSecret,spotifyAPIclientID} from '../api-keys'

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private encoded = btoa(spotifyAPIclientID + ':' + spotifyAPIclientSecret );

  constructor(private _http: Http) { }

  getToken() {
    var params = ('grant_type=client_credentials');
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.encoded);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post('https://accounts.spotify.com/api/token', params, { headers: headers })
      .map(response => response.json());
  }

  searchArtistID(artistName: string, token: string) {
      this.searchUrl = 'https://api.spotify.com/v1/search?query=' + artistName + '&type=artist';
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      return this._http.get(this.searchUrl, { headers: headers })
        .map((token: Response) => {return token.json()})
    }

  findArtistTopTrack(id: string, token: string) {
      this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&type=artist';
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      return this._http.get(this.searchUrl, { headers: headers })
        .map((token: Response) => {return token.json()})
    }


}
