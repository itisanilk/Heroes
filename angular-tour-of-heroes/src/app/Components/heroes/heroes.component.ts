import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/Classes/hero';
import { HeroService } from 'src/app/Services/hero.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[]=[];
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    //this.heroes=this.heroService.getHeroes();
    this.heroService.getHeroes()
                    .subscribe(heroes=>this.heroes=heroes);
  }

  addHero(name: string) : void {
    name = name.trim();
    if(!name) { return; }
     this.heroService.addHero({ name } as Hero)
                     .subscribe(_ => this.getHeroes());
  }

  deleteHero(hero: Hero){
    this.heroService.deleteHero(hero.id)
                    .subscribe(_=>this.getHeroes());
  }
  /*
  selectedHero?: Hero;
  onClick(hero: Hero)
  {
    this.selectedHero=hero;
    this.messageService.add(`HeroesComponent: Selected Hero Id=${hero.id}`);
  }*/
  //test
}
