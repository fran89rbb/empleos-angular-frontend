import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Vacante } from 'src/app/models/vacante';
import { VacanteService } from 'src/app/services/vacante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  vacante: Vacante = new Vacante();
  categorias: Categoria[];
  errores: String[];

  constructor(private _vacanteService: VacanteService, private router: Router, private activatedRdoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarVacante();
    this._vacanteService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    })
  }

  create(){
    this._vacanteService.create(this.vacante).subscribe( resp => {
      this.router.navigate(['/vacantes'])
      Swal.fire({
        title: 'Nuevo vacante',
        text: `La vacante ${resp.nombre} ha sido creada con éxito`,
        icon: 'success'
      });
    },
    err => {
      this.errores = err.error.errors as string[];
      console.log("Código de error desde el backend: " + err.status);
    }
    )
  }

  cargarVacante(){
    this.activatedRdoute.paramMap.subscribe( params => {
      let id:number = +params.get('id');

      if(id){
        this._vacanteService.getVacante(id).subscribe( resp => {
          this.vacante = resp;
          console.log(resp);
        });
      }
    });
  }

  update(){
    this._vacanteService.update(this.vacante).subscribe( resp => {
      this.router.navigate(['/vacantes'])
      Swal.fire({
        title: 'Cliente actualizado',
        text: `${resp.mensaje}`,
        icon: 'success'
      });
    },
    err => {
      this.errores = err.error.errors as string[];
      console.log("Código de error desde el backend: " + err.status);
    }
    )
  }

  compararCategoria(o1: Categoria, o2: Categoria){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
