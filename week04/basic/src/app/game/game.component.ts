import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  status = 'Please enter your guess';
  guess = '';
  history = [];

  check(): void {
    if (this.guess === 'Angular') {
      this.status = `${this.guess} is correct!`;
    } else {
      this.status = `${this.guess} is incorrect`;
      this.history.push(this.guess);
    }
  }

}
