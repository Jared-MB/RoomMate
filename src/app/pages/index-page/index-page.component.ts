import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../../interfaces/rental';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styles: ``
})
export class IndexPageComponent implements OnInit {
  rents: Apartment[] = []

  constructor(
    private readonly apartmentService: ApartmentService
  ) { }

  ngOnInit(): void {
    this.apartmentService.getApartments().subscribe(apartments => {
      this.rents = apartments
    })
  }
}
