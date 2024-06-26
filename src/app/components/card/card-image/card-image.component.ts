import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-image',
  templateUrl: './card-image.component.html',
  styles: ``
})
export class CardImageComponent {

  @Input() src = '';

}
