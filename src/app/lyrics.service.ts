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

    getLyrics(artist: string, song: string): Observable<ILyrics | null> {
        let finalUrl: string = `${this.url}/${artist}/${song}`;

        return this.http.get<ILyrics | null>(finalUrl).pipe(
            tap((data: ILyrics | null) => console.log('Data: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';

        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }
}