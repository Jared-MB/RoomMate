import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardFooterComponent } from './card-footer/card-footer.component';



@NgModule({
  declarations: [
    CardComponent,
    CardImageComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardImageComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent
  ]
})
export class CardModule { }
