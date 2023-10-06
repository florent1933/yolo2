import { Component, OnInit } from '@angular/core';
import {
  Person,
  initialStatePerson,
} from 'src/app/interfaces/person.interface';

@Component({
  selector: 'app-new-cmp',
  templateUrl: './new-cmp.component.html',
  styleUrls: ['./new-cmp.component.scss'],
})
export class NewCmpComponent implements OnInit {
  title = 'Hello';
  interval: number = 0;

  addFormPerson: Person = { ...initialStatePerson };

  persons: Person[] = [
    {
      name: 'John',
      age: 42,
      img: 'https://www.parismatch.com/lmnr/f/webp/rcrop/230,230,center-middle/img/var/pm/public/media/image/John-Travolta.jpg?VersionId=xLw0P9UQcMD.mOXk7sGvZNp9OQR5uGU1',
      diedAt: undefined,
    },
    {
      name: 'Florent',
      age: 30,
      img: 'https://i.f1g.fr/media/cms/704x396_cropupscale/2023/09/22/c765322825bba50191458d24c13133156a93bb2bb995009cc91b71deb423cc4f.jpg',
      diedAt: undefined,
    },
  ];

  get lists(): Person[] {
    return this.persons.filter((person) => person.diedAt);
  }

  constructor() {
    setTimeout(() => {
      this.title = 'Hello toi';
    }, 5000);

    setInterval(() => {
      this.interval = this.interval + 1;
      //this.interval++
    }, 1000);

    /*
    setInterval(() => {
      if (this.person.age < 50) {
        this.person.age = this.person.age + 1;
      } else {
        window.alert('Trop vieux');
        this.person.age = 0;
      }
    }, 2000);
    */
  }

  ngOnInit(): void {
    /*
    setTimeout(() => {
      this.title = 'Hello toi';
    }, 5000);

    setInterval(() => {
      this.interval = this.interval + 1;
      //this.interval++
    }, 1000);
    */
  }

  die(person: Person) {
    window.alert(`Avis de décès : ${person.name} (${person.age} years old)`);
    person.diedAt = person.age;
    person.age = 0;
  }

  notDie(person: Person) {
    window.alert(
      `Avis de non décès : ${person.name} (${person.age} years old)`
    );
    if (person.diedAt) {
      person.age = person.diedAt;
      person.diedAt = undefined;
    }
  }

  addPerson() {
    this.persons.push(this.addFormPerson);
    this.addFormPerson = { ...initialStatePerson };
  }
}
