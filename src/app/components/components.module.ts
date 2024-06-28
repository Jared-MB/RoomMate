import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CardModule } from './card/card.module';
import { LinkComponent } from './link/link.component';
import { InputModule } from './input/input.module';
import { icons, LucideAngularModule } from 'lucide-angular';
import { RateComponent } from './rate/rate.component';
import { RouterModule } from '@angular/router';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    LinkComponent,
    RateComponent,
    RadioComponent,
    SelectComponent,
    MapComponent,
    ImageGridComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    InputModule,
    LucideAngularModule.pick(icons),
    RouterModule,
    GoogleMapsModule,
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    CardModule,
    LinkComponent,
    InputModule,
    RateComponent,
    RadioComponent,
    SelectComponent,
    MapComponent,
    ImageGridComponent
  ]
})
export class ComponentsModule { }
