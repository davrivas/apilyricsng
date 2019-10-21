import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ILyrics } from './lyrics';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LyricsService {
    // https://api.lyrics.ovh/v1/artist/title
    private url: string = 'https://api.lyrics.ovh/v1';

    constructor(private http: HttpClient) { }

    getLyrics(artist: string, song: string): Observable<ILyrics> {
        const finalUrl: string = `${this.url}/${artist}/${song}`;

        return this.http.get<ILyrics>(finalUrl);
    }
}
