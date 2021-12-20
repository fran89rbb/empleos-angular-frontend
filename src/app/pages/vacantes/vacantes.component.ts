import { Component, OnInit } from '@angular/core';
import { Vacante } from 'src/app/models/vacante';
import { VacanteService } from 'src/app/services/vacante.service';

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
    this._vacanteService.delete(vacante.id).subscribe( resp => {
      this.vacantes = this.vacantes.filter (vac => vac !== vacante);
    })
  }

}
