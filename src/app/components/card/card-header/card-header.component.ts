import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-header',
  templateUrl: './card-header.component.html',
  styles: ``
})
export class CardHeaderComponent {

  @Input() class = '';

}
