import { Component, Input } from '@angular/core';

@Component({
  selector: 'label-component',
  templateUrl: './label-component.component.html',
  styles: ``
})
export class LabelComponentComponent {
  @Input() htmlFor = '';
}
