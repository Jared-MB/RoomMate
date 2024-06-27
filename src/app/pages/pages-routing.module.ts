import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { AddApartmentPageComponent } from './add-apartment-page/add-apartment-page.component';
import { ApartmentPageComponent } from './apartment-page/apartment-page.component';
import { LayoutComponent } from './layout/layout.component';
import { NearPageComponent } from './near-page/near-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexPageComponent
      },
      {
        path: 'add-department',
        component: AddApartmentPageComponent
      },
      {
        path: 'near',
        component: NearPageComponent
      },
      {
        path: ':id',
        component: ApartmentPageComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
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
