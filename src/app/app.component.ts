import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() artist: string;
  @Input() song: string;
  readonly title: string = 'Api Lyrics Ng';
  readonly url: string = 'https://api.lyrics.ovh/v1/'; // https://api.lyrics.ovh/v1/artist/title
  lyrics: string;

  searchForASong(): void {
    if (this.artist == null || this.song == null
      || this.artist.length === 0 || this.artist.length === 0) {
        let request: string = `${this.url}/${this.artist}/${this.song}`;
      }
  }
}
