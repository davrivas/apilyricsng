import { Component } from '@angular/core';
import { ILyrics } from './lyrics';
import { LyricsService } from './lyrics.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    readonly title: string = 'Api Lyrics Ng';
    artist: string;
    song: string;
    lyricsObj: ILyrics;
    lyrics: string;

    constructor(private lyricsService: LyricsService) { }

    searchForASong(): void {
        if (this.lyrics != null) this.lyrics = null;

        if (this.isNullOrWhitespace(this.artist) || this.isNullOrWhitespace(this.song)) {
            this.lyricsObj = this.lyricsService.getLyrics(this.artist, this.song);

            if (this.lyricsObj == null) {
                // TODO: complete this case
            } else {
                this.lyrics = this.lyricsObj.lyrics;
            }
        } else {
            alert('You must provide an artist or song');
        }
    }

    private isNullOrWhitespace(str: string): boolean {
        return str == null || str.trim().length === 0;
    }
}
