import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable,  throwError } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Vacante } from '../models/vacante';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  private urlEndpoint = "http://localhost:8090/app";

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getVacantesHome(): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(this.urlEndpoint + "/home");
  }

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndpoint + "/categorias");
  }

  getVacante(id: number): Observable<Vacante>{
    return this.http.get<Vacante>(`${this.urlEndpoint}/home/verDetalle/${id}`)
    .pipe(catchError( e => {
      this.router.navigate(['/home'])
      Swal.fire({
        title: 'Error al recuperar vacante',
        text: e.error.mensaje,
        icon: 'error'
      })
      return throwError (e);
    }))
  }

  getVacantes(): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(this.urlEndpoint + "/vacantes");
  }

  create(vacante: Vacante): Observable<Vacante>{
    return this.http.post<Vacante>(this.urlEndpoint + "/vacantes", vacante, {headers: this.httpHeaders})
      .pipe(
        (map((resp:any) => resp.vacante as Vacante)),
        (catchError( e => {
          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error'
          });
        return throwError(e);
    })));
  }

  update(vacante: Vacante): Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/vacantes/${vacante.id}`, vacante, {headers: this.httpHeaders})
    .pipe(catchError( e => {
      this.router.navigate(['/vacantes'])
      Swal.fire({
        title: 'Error al recuperar vacante',
        text: e.error.mensaje,
        icon: 'error'
      });
      return throwError(e);
    }))
  }

  delete(id: number): Observable<Vacante>{
    return this.http.delete<Vacante>(`${this.urlEndpoint}/vacantes/${id}`)
    .pipe(catchError( e => {
      this.router.navigate(['/vacantes'])
      Swal.fire({
        title: 'Error al recuperar vacante',
        text: e.error.mensaje,
        icon: 'error'
      });
      return throwError(e);
    }))
  }
  
}
