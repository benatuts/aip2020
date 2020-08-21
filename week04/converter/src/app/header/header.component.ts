import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() index: number;
  @Input() converterNames: string[];
  @Output() indexChange = new EventEmitter<number>();

  onChangeConverter(indexValue: number): void {
    this.index = indexValue;
    this.indexChange.emit(indexValue);
  }
}
