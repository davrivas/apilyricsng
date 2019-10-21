import { Component, Input } from '@angular/core';
import { LyricsService } from './lyrics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title: string = 'Api Lyrics Ng';

  @Input() artist: string;
  @Input() song: string;
  lyrics: string;

  constructor(private lyricsService: LyricsService) { }

  searchForASong(): void {
    if (!this.isNullOrWhitespace(this.artist) || !this.isNullOrWhitespace(this.song)) {
      this.lyricsService.getLyrics(this.artist, this.song).subscribe(
        result => this.lyrics = result.lyrics,
        error =>  {
          this.lyrics = null;
          alert(error.message);
        }
      );
    } else {
      alert('You must provide an artist or song');
    }
  }

  private isNullOrWhitespace(str: string): boolean {
    return str == null || str.trim().length === 0 || str === undefined;
  }
}
