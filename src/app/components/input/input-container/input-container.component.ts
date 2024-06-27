import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styles: ``
})
export class InputContainerComponent {
  @Input() class: string = '';
}
