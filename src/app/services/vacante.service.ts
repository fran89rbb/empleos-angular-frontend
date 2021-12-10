import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacante } from '../models/vacante';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  private urlEndpoint = "http://localhost:8090/app";

  constructor(private http: HttpClient) { }

  getVacantesHome(): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(this.urlEndpoint + "/home");
  }
}
