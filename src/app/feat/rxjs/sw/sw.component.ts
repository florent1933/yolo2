import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.planets$ = this.http.get<Result>('https://swapi.dev/api/planets').pipe(
      map((result) => {
        console.log(result);
        return result.results;
      })
    );
  }
}
