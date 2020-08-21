import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guess-item',
  templateUrl: './guess-item.component.html',
  styleUrls: ['./guess-item.component.css']
})
export class GuessItemComponent {

  @Input() value: string;

}
