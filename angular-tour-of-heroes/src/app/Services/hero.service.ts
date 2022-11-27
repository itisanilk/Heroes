import { Injectable, ɵresetJitOptions } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from 'src/app/Classes/hero';
import { HEROES } from 'src/app/Classes/mock-heroes';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroUrl = 'http://localhost:3000/api/heroes';
  //private heroUrl = 'http://192.168.43.205:802/api/heroes';  //for IIS server
  //private heroUrl = 'https://localhost:7239/api/heroes';   // for local

  constructor(private messageService: MessageService, 
              private httpClient: HttpClient) { }

  getHeroes() : Observable<Hero[]>
  {
      return this.httpClient.get<Hero[]>(this.heroUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

/** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroUrl}/${id}`;
  return this.httpClient.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

updateHero(hero: Hero) : Observable<any> {
  return this.httpClient.put(`${this.heroUrl}/${hero.id}`, hero, this.httpOptions).pipe(
   tap(_ => this.log(`Updated hero Id=${ hero.id }`)),
   catchError(this.handleError<any>('updateHero'))
   );
}

addHero(hero: Hero) : Observable<Hero> {
   return this.httpClient.post<Hero>(this.heroUrl, this.httpOptions)
   .pipe(tap((newHero : Hero) => this.log(`New hero added w/ Id=${ newHero }`)),
        catchError(this.handleError<Hero>('addHero')));
}

deleteHero(id: number) : Observable<Hero> {
  const url = `${this.heroUrl}/${id}`;
  return this.httpClient.delete<Hero>(url, this.httpOptions)
  .pipe(tap(_=>this.log(`hero deleted id ${id}`)),
  catchError(this.handleError<Hero>('hero deleted'))
  );
}

searchHeroes(term: string) : Observable<Hero[]>{
  if(!term.trim())
   { return of([]); }
  const url = `http://localhost:3000/api/heroes/${term}/anystring`
  return this.httpClient.get<Hero[]>(url).pipe(tap(x=>x.length ? 
               this.log(`found heroes matching "${term}"`) :
               this.log(`No heroes matching "${term}"`)),
               catchError(this.handleError<Hero[]>('searchHeroes', [])));
}

  private log(message: string)
  {
    this.messageService.add(`HeroService: ${ message }`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  httpOptions = { 
    headers: new HttpHeaders ( { 'Content-Type': 'application/json' } )
  }
}

//done test

