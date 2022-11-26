import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/Classes/hero';
import { HeroService } from 'src/app/Services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$! : Observable<Hero[]>;
  searchTerm = new Subject<string>;

  searchHeroes(term: string){
    this.searchTerm.next(term);
  }
  constructor(private heroService : HeroService) { }

    ngOnInit(): void {
        this.heroes$ = this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term:string) => this.heroService.searchHeroes(term)),
      );
      
  }

}
