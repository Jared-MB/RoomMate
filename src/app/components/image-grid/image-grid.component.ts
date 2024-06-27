import { Component, Input } from '@angular/core';
import { Image } from '../../../interfaces/image';

@Component({
  selector: 'image-grid',
  templateUrl: './image-grid.component.html',
  styles: ``
})
export class ImageGridComponent {

  @Input() images: Image[] = []

}
