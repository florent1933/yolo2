import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subscription,
  buffer,
  bufferCount,
  combineLatest,
  filter,
  map,
  of,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  timer = timer(0, 1000);

  obs1: Observable<string> = of('Je suis un observable', 'dsq', 'kklkl');

  obs2 = this.obs1.pipe(
    map((x) => {
      return x + '!';
    }),
    tap((x) => {
      console.log('Valeur de x :', x);
    })
  );

  obs3 = this.obs2.pipe(
    filter((x) => {
      return x.includes('s');
    }),
    tap((x) => {
      console.log('Valeur filtrée de x :', x);
    })
  );

  constructor() {}

  ngOnInit(): void {
    this.timer.subscribe((x) => {
      console.log('timer:', x);
    });
  }
}
