import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, timer } from 'rxjs';

interface ORDER {
  nbOfChocolatines: number;
  nbOfCroissants: number;
  date: Date;
}

const CHOLATINES_PRODUCTION = 3;
const CHOCOLATINE_FACTORY_PRICE = 0.2;
const CROISSANTS_FACTORY_PRICE = 0.16;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  chocolatines$: Observable<number> = timer(0, 3000).pipe(
    map((x) => CHOLATINES_PRODUCTION * x)
  );

  chocolatinesCost$ = this.chocolatines$.pipe(
    map((chocolatines) => chocolatines * CHOCOLATINE_FACTORY_PRICE)
  );

  croissants$: Observable<number> = timer(0, 300);

  croissantsCost$ = this.croissants$.pipe(
    map((c) => c * CROISSANTS_FACTORY_PRICE)
  );

  costFactory$: Observable<number> = combineLatest([
    this.chocolatinesCost$,
    this.croissantsCost$,
  ]).pipe(map(([x, y]) => x + y));

  customerTimer$ = timer(5000, 5000);

  orders: ORDER[] = [];
  orders$: Observable<ORDER[]> = this.customerTimer$.pipe(
    map((c) => {
      let newOrder: ORDER = {
        nbOfChocolatines: this.getRandomNumber(1, 10),
        nbOfCroissants: this.getRandomNumber(1, 10),
        date: new Date(),
      };

      this.orders.push(newOrder);
      return this.orders;
    })
  );

  constructor() {}

  ngOnInit(): void {}

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1)) + min;
  }
}
