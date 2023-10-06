import { Component, OnInit } from '@angular/core';
import {
  Observable,
  combineLatest,
  lastValueFrom,
  map,
  shareReplay,
  switchMap,
  take,
  timer,
} from 'rxjs';

interface ORDER {
  nbOfChocolatines: number;
  nbOfCroissants: number;
  date: Date;
}

interface ORDER_SUMMARY {
  nbOfChocolatines: number;
  moenyChocolatines: number;
  nbOfCroissants: number;
  moneyCroissants: number;
  date: Date;
}

const CHOCOLATINE_PRICE = 1.3;
const CROISSANT_PRICE = 1.1;

const CHOLATINES_PRODUCTION = 3;
const CHOCOLATINE_FACTORY_PRICE = 0.2;
const CROISSANTS_FACTORY_PRICE = 0.16;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  chocolatines$: Observable<number> = timer(0, 3000)
    .pipe(map((x) => CHOLATINES_PRODUCTION * x))
    .pipe(shareReplay(1));

  chocolatinesCost$ = this.chocolatines$.pipe(
    map((chocolatines) => chocolatines * CHOCOLATINE_FACTORY_PRICE)
  );

  croissants$: Observable<number> = timer(0, 300).pipe(shareReplay(1));

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
    switchMap(async (c) => {
      const maxCroissantsAvailable = await lastValueFrom(
        this.croissants$.pipe(take(1))
      );
      const maxChocolatinesAvailable = await lastValueFrom(
        this.chocolatines$.pipe(take(1))
      );

      console.log('maxCroissantsAvailable', maxCroissantsAvailable);

      let newOrder: ORDER = {
        nbOfChocolatines: this.getRandomNumber(
          0,
          maxChocolatinesAvailable > 10 ? 10 : maxChocolatinesAvailable
        ),
        nbOfCroissants: this.getRandomNumber(
          0,
          maxCroissantsAvailable > 10 ? 10 : maxCroissantsAvailable
        ),
        date: new Date(),
      };

      this.orders.push(newOrder);
      return this.orders;
    }),
    shareReplay(1)
  );

  moneys$: Observable<ORDER_SUMMARY> = this.orders$.pipe(
    map((orders) => {
      let newOrder: ORDER_SUMMARY = {
        nbOfChocolatines: 0,
        moenyChocolatines: 0,
        nbOfCroissants: 0,
        moneyCroissants: 0,
        date: new Date(),
      };

      orders.forEach((order) => {
        newOrder.nbOfChocolatines =
          newOrder.nbOfChocolatines + order.nbOfChocolatines;
        newOrder.nbOfCroissants =
          newOrder.nbOfCroissants + order.nbOfCroissants;
      });

      return {
        ...newOrder,
        moenyChocolatines:
          newOrder.nbOfChocolatines * CHOCOLATINE_PRICE +
          newOrder.moenyChocolatines,
        moneyCroissants:
          newOrder.nbOfCroissants * CROISSANT_PRICE + newOrder.moneyCroissants,
      };
    })
  );

  stocks$: Observable<{
    chocolatines: number;
    croissants: number;
  }> = combineLatest([this.chocolatines$, this.croissants$, this.moneys$]).pipe(
    map(([chocolatines, croissants, money]) => {
      return {
        chocolatines: chocolatines - money.nbOfChocolatines,
        croissants: croissants - money.nbOfCroissants,
      };
    })
  );

  constructor() {}

  ngOnInit(): void {}

  getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
