import { Component, Inject } from '@angular/core';
import { SelectOption } from '../../../interfaces/select';
import { FormControl, FormGroup } from '@angular/forms';
import { ApartmentService } from '../../services/apartment.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-department-page',
  templateUrl: './add-apartment-page.component.html',
  styles: ``,
})
export class AddApartmentPageComponent {

  constructor(
    @Inject(ApartmentService) private readonly apartmentService: ApartmentService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  properties: SelectOption[] = [
    {
      value: 'HOUSE',
      label: 'Casa'
    },
    {
      value: 'APARTMENT',
      label: 'Apartamento'
    },
  ]

  onSubmit() {
    const apartment = this.apartmentService.validateApartment(this.apartment.value)
    const lessor = this.apartmentService.validateLessor(this.apartment.value)

    if (!apartment.success || !lessor.success) {
      this.snackBar.open('Complete los campos requeridos', 'Cerrar')
      console.log(lessor.error?.flatten().fieldErrors)
      console.log(apartment.error?.flatten().fieldErrors)
      return
    }

    const data = new FormData();

    // Agregar los campos del formulario a formData
    data.append('lessor', JSON.stringify({
      name: lessor.data.name,
      email: lessor.data.email,
      phone: lessor.data.phone.toString()
    }));
    data.append('address', apartment.data.address);
    data.append('type', apartment.data.type);
    data.append('price', apartment.data.price.toString());
    data.append('isPetFriendly', apartment.data.isPetFriendly.toString());
    data.append('isSharedRoom', apartment.data.isSharedRoom.toString());
    data.append('isSharedBathroom', apartment.data.isSharedBathroom.toString());
    data.append('isSharedKitchen', apartment.data.isSharedKitchen.toString());
    data.append('lat', apartment.data.lat.toString());
    data.append('lng', apartment.data.lng.toString());
    data.append('shortDescription', apartment.data.shortDescription);
    data.append('longDescription', apartment.data.longDescription);

    // Agregar las imágenes si existen
    if (apartment.data.image1) {
      data.append('image1', apartment.data.image1);
    }
    if (apartment.data.image2) {
      data.append('image2', apartment.data.image2);
    }
    if (apartment.data.image3) {
      data.append('image3', apartment.data.image3);
    }

    console.log(Object.fromEntries((data as any).entries()))

    this.apartmentService.createApartment(data).pipe(catchError(_error => of(null))).subscribe(apartment => {
      if (!apartment) {
        this.snackBar.open('Error al crear el departamento', 'Cerrar')
        return
      }
      this.snackBar.open('Departamento creado', 'Cerrar')
      this.router.navigate([''])
    })

  }

  errors = []

  apartment = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    price: new FormControl(''),
    type: new FormControl('HOUSE'),
    isPetFriendly: new FormControl(false),
    isSharedRoom: new FormControl(false),
    isSharedBathroom: new FormControl(false),
    isSharedKitchen: new FormControl(false),
    shortDescription: new FormControl(''),
    longDescription: new FormControl(''),
    rooms: new FormControl<number | null>(null),
    lat: new FormControl<number | null>(null),
    lng: new FormControl<number | null>(null),
    image1: new FormControl<File | null>(null),  // Añadir el campo de imagen 1
    image2: new FormControl<File | null>(null),  // Añadir el campo de imagen 2
    image3: new FormControl<File | null>(null)   // Añadir el campo de imagen 3
  });

  imagePreviews: { [key: string]: string } = {};

  updateLocation(lat: number, lng: number) {
    this.apartment.patchValue({ lat, lng });
  }

  onFileSelected(event: Event, imageField: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.apartment.patchValue({ [imageField]: file });

      // Generar vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews[imageField] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}