import { Component, Input, OnChanges } from '@angular/core';
import { Converter } from './converter';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnChanges {
  from: number;
  to: number;
  @Input() converter: Converter;

  onClickConvert(): void {
    if (!this.from) {
      return;
    }
    this.to = this.converter.convert(this.from);
  }

  ngOnChanges(): void {
    this.from = null;
    this.to = null;
  }
}
