import { SpotifyService } from '../services/spotify.service'

export class Artist {
  private spotifyAPI: SpotifyService;

  constructor (
    public artistName: string,
    public artistID: string = '',
  ) {}
  
}
