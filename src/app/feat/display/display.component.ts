import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  @Input() nbOfYolos: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  getColor(index: number): string {
    let color = index * 20;
    return `rgb(${color}, 0 ,${color})`;
  }
}
