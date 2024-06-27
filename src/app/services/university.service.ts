import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from '../../interfaces/university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  api = environments.api

  constructor(
    private readonly http: HttpClient
  ) { }

  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(`${this.api}/university`)
  }
}
