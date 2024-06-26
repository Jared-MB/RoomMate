import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { AddApartmentPageComponent } from './add-apartment-page/add-apartment-page.component';
import { ApartmentPageComponent } from './apartment-page/apartment-page.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'add-department',
    component: AddApartmentPageComponent
  },
  {
    path: ':id',
    component: ApartmentPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
