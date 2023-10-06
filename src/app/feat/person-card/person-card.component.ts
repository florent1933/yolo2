import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/interfaces/person.interface';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent implements OnInit {
  @Input() person?: Person;

  @Input() size: 'small' | 'medium' = 'medium';

  @Output() deletePerson = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  die() {
    this.deletePerson.emit();
  }
}
