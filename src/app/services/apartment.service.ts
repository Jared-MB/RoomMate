import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { z } from 'zod'
import { Apartment } from '../../interfaces/rental';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(
    private readonly http: HttpClient
  ) { }

  private apartmentSchema = z.object({
    address: z.string().min(5),
    type: z.enum(['HOUSE', 'APARTMENT']),
    price: z.preprocess((val) => Number(val), z.number().positive()),
    isPetFriendly: z.boolean(),
    isSharedRoom: z.boolean(),
    isSharedBathroom: z.boolean(),
    isSharedKitchen: z.boolean(),
    _id: z.string().optional(),
    url: z.string().optional(),
    lat: z.number(),
    lng: z.number(),
    image1: z.instanceof(File),
    image2: z.instanceof(File).nullable(),
    image3: z.instanceof(File).nullable(),
    shortDescription: z.string().min(5),
    longDescription: z.string().min(5),
  })

  private lessorSchema = z.object({
    name: z.string().min(3),
    email: z.string().email().min(3),
    phone: z.preprocess((val) => Number(val), z.number().positive()),
    _id: z.string().optional(),
  })

  validateApartment(apartment: unknown) {
    return this.apartmentSchema.safeParse(apartment)
  }

  validateLessor(lessor: unknown) {
    return this.lessorSchema.safeParse(lessor)
  }

  createApartment(apartment: FormData): Observable<Apartment> {
    return this.http.post<Apartment>('http://localhost:3000/apartment', apartment)
  }

  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>('http://localhost:3000/apartment')
  }

  getApartment(id: string): Observable<Apartment> {
    return this.http.get<Apartment>(`http://localhost:3000/apartment/${id}`)
  }
}
