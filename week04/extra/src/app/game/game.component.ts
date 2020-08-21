import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  status = 'Please enter your guess';
  guess = '';

  constructor(
    public gameService: GameService) {
  }

  guesses(): string[] {
    return this.gameService.guesses;
  }

  check(): void {
    if (this.gameService.check(this.guess)) {
      this.status = `${this.guess} is correct!`;
    } else {
      this.status = `${this.guess} is incorrect`;
    }
  }

}
