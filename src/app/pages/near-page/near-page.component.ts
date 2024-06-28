import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../../interfaces/rental';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectOption } from '../../../interfaces/select';
import { UniversityService } from '../../services/university.service';
import { University } from '../../../interfaces/university';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-near-page',
  templateUrl: './near-page.component.html',
  styles: ``
})
export class NearPageComponent implements OnInit {
  rents: Apartment[] = []
  coords: { lat: number, lng: number, id: string, name?: string }[] = []

  nearKm: SelectOption[] = [{
    label: '1 km',
    value: '1'
  }, {
    label: '5 km',
    value: '5'
  }, {
    label: '10 km',
    value: '10'
  }]

  universities: University[] = []
  universitiesFiltered: University[] = []

  constructor(
    private readonly apartmentService: ApartmentService,
    private readonly universityService: UniversityService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  center: { lat: number, lng: number, name: string, id: string } | null = null
  university = new FormControl('')

  searchUniversity() {
    if (!this.university.value) {
      this.universitiesFiltered = this.universities
      return
    }
    this.universitiesFiltered = this.universities.filter(university => university.name.toLowerCase().includes((this.university.value as string).toLowerCase()))
  }

  displayFn(university: University): string {
    return university && university.name ? university.name : '';
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.center = {
      lat: event.option.value.lat,
      lng: event.option.value.lng,
      name: event.option.value.name,
      id: event.option.value.id
    }
  }

  nearBy = new FormControl('5', {
    nonNullable: true
  })

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
    this.universityService.getUniversities().subscribe(universities => {
      this.universities = universities
      this.universitiesFiltered = universities
      this.coords = [
        ...this.coords,
        ...universities
      ]
    })
    this.route.queryParams.pipe().subscribe(params => {
      this.filters.patchValue(params as any)
      this.apartmentService.getApartments(new URLSearchParams(params)).subscribe(apartments => {
        this.coords = [
          ...this.coords,
          ...apartments.map(apartment => ({ lat: apartment.lat, lng: apartment.lng, id: apartment.id }))
        ]
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
    this.router.navigate(['/near'], { queryParams: query })
    this.apartmentService.getApartments(searchParams).subscribe(apartments => {
      this.rents = apartments
      this.coords = apartments.map(apartment => ({ lat: apartment.lat, lng: apartment.lng, id: apartment.id }))
    })
  }

  getLocations(event: { lat: number, lng: number, id: string }[]) {
    const mappedFilters = Object.entries(this.filters.value)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, value?.toString() ?? ''])

    const searchParams = new URLSearchParams(mappedFilters)
    this.apartmentService.getApartments(searchParams).subscribe(apartments => {
      this.rents = apartments.filter(rent => event.some(coord => coord.id === rent.id))
    })
  }

}
