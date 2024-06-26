import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import { ComponentsModule } from '../components/components.module';
import { RentTypePipe } from '../pipes/rent-type.pipe';
import { PagesRoutingModule } from './pages-routing.module';
import { AddApartmentPageComponent } from './add-apartment-page/add-apartment-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutComponent } from './layout/layout.component';
import { ApartmentPageComponent } from './apartment-page/apartment-page.component';
import { CarouselModule } from '@coreui/angular';
import { icons, LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [
    IndexPageComponent,
    RentTypePipe,
    AddApartmentPageComponent,
    LayoutComponent,
    ApartmentPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CarouselModule,
    LucideAngularModule.pick(icons),
  ]
})
export class PagesModule { }
