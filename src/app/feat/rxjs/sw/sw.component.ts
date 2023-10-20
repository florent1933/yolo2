import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  shareReplay,
} from 'rxjs';

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface Result {
  count: number;
  next: string;
  previous: string;
  results: Planet[];
}

@Component({
  selector: 'app-sw',
  templateUrl: './sw.component.html',
  styleUrls: ['./sw.component.scss'],
})
export class SwComponent implements OnInit {
  planets$: Observable<Planet[]> = of([]);

  filteredPlanets$: Observable<Planet[]> = of([]);

  climatsAvailable$: Observable<string[]> = of([]);
  terrainsAvailable$: Observable<string[]> = of([]);

  userFilter = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.planets$ = this.http.get<Result>('https://swapi.dev/api/planets').pipe(
      map((result) => {
        console.log(result);
        return result.results;
      }),
      shareReplay(1)
    );

    this.climatsAvailable$ = this.planets$.pipe(
      map((planets) => {
        const climats = planets.map((planet) => planet.climate);
        return climats;
      })
    );

    this.terrainsAvailable$ = this.planets$.pipe(
      map((planets) => {
        const terrains = planets.map((planet) => planet.terrain);
        return terrains;
      })
    );

    this.filteredPlanets$ = combineLatest([
      this.planets$,
      this.userFilter,
    ]).pipe(
      map(([planets, userFilter]) => {
        if (!userFilter?.length) {
          return planets;
        }
        return planets.filter((planet) => {
          return planet.terrain.includes(userFilter);
        });
      })
    );
  }
}
