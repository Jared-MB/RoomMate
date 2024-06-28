import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputContainerComponent } from './input-container/input-container.component';
import { InputComponentComponent } from './input-component/input-component.component';
import { LabelComponentComponent } from './label-component/label-component.component';
import { icons, LucideAngularModule } from 'lucide-angular';
import { TextareaComponentComponent } from './textarea-component/textarea-component.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    InputContainerComponent,
    InputComponentComponent,
    LabelComponentComponent,
    TextareaComponentComponent
  ],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons),

    MatAutocompleteModule
  ],
  exports: [
    InputContainerComponent,
    InputComponentComponent,
    LabelComponentComponent,
    TextareaComponentComponent
  ]
})
export class InputModule { }
