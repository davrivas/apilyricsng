import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  artist: string;
  song: string;
  readonly title: string = 'Api Lyrics Ng';
  readonly url: string = 'https://api.lyrics.ovh/v1/'; // https://api.lyrics.ovh/v1/artist/title
  lyrics: string;

  constructor(private client: HttpClient) { }

  searchForASong(): void {
    if (this.artist == null || this.song == null || this.artist.length === 0 || this.artist.length === 0) {
      const request: string = `${this.url}/${this.artist}/${this.song}`;
      this.client.get<any>(request).pipe(
        tap(data => this.lyrics = data.lyrics),
        catchError(this.handleError)
      );
    }
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    this.lyrics = errorMessage;
    return throwError(errorMessage);
  }
}
