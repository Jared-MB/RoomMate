import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
  styles: [``]
})
export class ButtonComponent {

  @Input() variant: 'primary' | 'outline' = 'primary';
  @Input() icon: string | null = null;

  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;

}
