import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";
  private apiKey = "API_KEY"; //Register on https://www.themoviedb.org/ to get ypur API key.
  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(pageNumber = 1) : Observable<Object> {
    return this.http.get(this.baseApiPath + `/movie/popular?page=${pageNumber}&api_key=` + this.apiKey);
  }

  getMovieDetails(filmeid) : Observable<Object> {
    return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=` + this.apiKey);
  }
}
