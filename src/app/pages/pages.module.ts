import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import { ComponentsModule } from '../components/components.module';
import { RentTypePipe } from '../pipes/rent-type.pipe';
import { PagesRoutingModule } from './pages-routing.module';
import { AddApartmentPageComponent } from './add-apartment-page/add-apartment-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from './layout/layout.component';
import { ApartmentPageComponent } from './apartment-page/apartment-page.component';
import { CarouselModule } from '@coreui/angular';
import { icons, LucideAngularModule } from 'lucide-angular';
import { NearPageComponent } from './near-page/near-page.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    IndexPageComponent,
    RentTypePipe,
    AddApartmentPageComponent,
    LayoutComponent,
    ApartmentPageComponent,
    NearPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CarouselModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    LucideAngularModule.pick(icons),
  ]
})
export class PagesModule { }
