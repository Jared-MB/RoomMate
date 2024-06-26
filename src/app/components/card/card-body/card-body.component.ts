import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-body',
  templateUrl: './card-body.component.html',
  styles: ``
})
export class CardBodyComponent {

  @Input() class = '';

}
