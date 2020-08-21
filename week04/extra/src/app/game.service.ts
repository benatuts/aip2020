import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  guesses: string[] = [];

  check(guess: string): boolean {
    const result = guess === 'Angular';
    if (!result) {
      this.guesses.push(guess);
    }
    return result;
  }
}
