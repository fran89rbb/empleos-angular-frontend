import { Component, OnInit } from '@angular/core';
import { Vacante } from 'src/app/models/vacante';
import { VacanteService } from 'src/app/services/vacante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styles: [
  ]
})
export class VacantesComponent implements OnInit {

  vacantes: Vacante[];

  constructor(private _vacanteService: VacanteService) { }

  ngOnInit(): void {
    this._vacanteService.getVacantes().subscribe( resp => {
      this.vacantes = resp;
    })
  }

  delete(vacante: Vacante){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la vacante ${vacante.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this._vacanteService.delete(vacante.id).subscribe(resp => {
          this.vacantes = this.vacantes.filter(cli => cli !== vacante);
          Swal.fire(
            'Vacante eliminada!',
            `Vacante ${vacante.nombre} eliminada con éxito`,
            'success'
          );
        }); 
      }
    });
  }

}
