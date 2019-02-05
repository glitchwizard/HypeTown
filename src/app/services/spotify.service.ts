import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private client_id = "17f3424549074c6296193fec7052a7ad";
  private client_secret = "db0991f0335b44d687da536f5f9d20b1";
  private encoded = btoa(this.client_id + ':' + this.client_secret);

  constructor(private _http: Http) { }

  getToken() {
    var params = ('grant_type=client_credentials');
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.encoded);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post('https://accounts.spotify.com/api/token', params, { headers: headers })
      .map(res => res.json());
  }

  searchAlbums(str: string, token: string) {
      this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&type=album';
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      return this._http.get(this.searchUrl, { headers: headers })
        .map((res: Response) => res.json())
    }
}
