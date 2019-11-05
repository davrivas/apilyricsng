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
    error: string;
    isBusy: boolean;

    constructor(private lyricsService: LyricsService) {
        this.isBusy = false;
    }

    searchForASong(): void {
        if (!this.isNullWhitespaceOrUndefined(this.artist) || !this.isNullWhitespaceOrUndefined(this.song)) {
            this.isBusy = true;
            this.lyricsService.getLyrics(this.artist, this.song).subscribe(
                result => {
                    this.error = undefined;
                    this.lyrics = result.lyrics.replace('\\n', '<br />');
                },
                error => {
                    this.lyrics = undefined;
                    this.error = error.message;
                }
            );
            this.isBusy = false;
        } else {
            alert('You must provide an artist or song');
        }
    }

    private isNullWhitespaceOrUndefined(str: string): boolean {
        return str == null || str.trim().length === 0 || str === undefined;
    }
}
