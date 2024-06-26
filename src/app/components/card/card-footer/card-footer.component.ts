import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-footer',
  templateUrl: './card-footer.component.html',
  styles: ``
})
export class CardFooterComponent {

  @Input() class = ''

}
