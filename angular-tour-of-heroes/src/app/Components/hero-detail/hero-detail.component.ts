import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'src/app/Services/hero.service';
import { Hero } from 'src/app/Classes/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero?: Hero;
  constructor(private activatedRoute: ActivatedRoute, 
              private heroService: HeroService, 
              private location: Location) 
              { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void
  {
    const id= Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
        .subscribe(hero => this.hero=hero);
  }

  updateHero(): void
  {
    if(this.hero) {
    this.heroService.updateHero(this.hero)
        .subscribe(()=>this.goBack());
      }
  }

  goBack(): void
  {
    this.location.back();
  }

}
