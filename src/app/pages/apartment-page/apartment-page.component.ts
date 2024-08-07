import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../../interfaces/rental';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Image } from '../../../interfaces/image';
import { UniversityService } from '../../services/university.service';
import { University } from '../../../interfaces/university';

@Component({
  selector: 'app-apartment-page',
  templateUrl: './apartment-page.component.html',
  styles: `
  `
})
export class ApartmentPageComponent implements OnInit {

  apartment!: Apartment
  universities: University[] = []
  images: Image[] = []

  constructor(
    private readonly apartmentService: ApartmentService,
    private readonly universityService: UniversityService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.universityService.getUniversities().subscribe(universities => {
      this.universities = universities
    })
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.apartmentService.getApartment(id)),
      catchError(_error => of(null))
    )
      .subscribe(apartment => {
        if (!apartment) {
          this.snackBar.open('No se pudo cargar el departamento', 'Cerrar', {
            duration: 3000
          })
          this.router.navigate(['/'])
          return
        }
        console.log(apartment)
        this.apartment = apartment
        this.images = apartment.images
        return
      })
  }

}
