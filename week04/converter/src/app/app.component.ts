import { Component } from '@angular/core';
import { Converter } from './converter/converter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedIndex = 0;
  converters: Converter[] = [
    {
      name: 'Temperature',
      from: 'Fahrenheit',
      to: 'Celsius',
      convert: (from: number) => ((from - 32) * 5) / 9,
    },
    {
      name: 'Distance',
      from: 'Miles',
      to: 'Kilometers',
      convert: (from: number) => from * 1.609344,
    },
    {
      name: 'Weight',
      from: 'Pounds',
      to: 'Kilograms',
      convert: (from: number) => from * 0.453592,
    },
  ];
  converterNames: string[];

  constructor() {
    this.converterNames = this.converters.map((item) => item.name);
  }
}
