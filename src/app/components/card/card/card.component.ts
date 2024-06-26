import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {

  @Input() class = '';

}
