import { Component, Input } from '@angular/core';

@Component({
  selector: 'link-component',
  templateUrl: './link.component.html',
  styles: ``
})
export class LinkComponent {

  @Input() href = '#';
  @Input() icon: string | null = null;

  @Input() variant: 'primary' | 'outline' = 'primary';
  @Input() asButton = false;

}
