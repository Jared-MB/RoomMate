import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../../interfaces/rental';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styles: ``
})
export class IndexPageComponent implements OnInit {
  rents: Apartment[] = []

  constructor(
    private readonly apartmentService: ApartmentService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  filters = new FormGroup({
    isHouse: new FormControl(false),
    isApartment: new FormControl(false),
    isSharedRoom: new FormControl(false),
    isSharedBathroom: new FormControl(false),
    isSharedKitchen: new FormControl(false),
    isPetFriendly: new FormControl(false),
    minPrice: new FormControl(0),
    maxPrice: new FormControl(0),
  })

  ngOnInit(): void {
    this.route.queryParams.pipe().subscribe(params => {
      this.filters.patchValue(params as any)
      this.apartmentService.getApartments(new URLSearchParams(params)).subscribe(apartments => {
        this.rents = apartments
      })
    })
  }

  onSubmit() {
    const mappedFilters = Object.entries(this.filters.value)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, value?.toString() ?? ''])

    const query = Object.fromEntries(mappedFilters)
    const searchParams = new URLSearchParams(mappedFilters)
    this.router.navigate([''], { queryParams: query })
    this.apartmentService.getApartments(searchParams).subscribe(apartments => {
      this.rents = apartments
    })
  }
}
