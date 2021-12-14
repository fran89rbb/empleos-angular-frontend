import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Vacante } from 'src/app/models/vacante';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  vacantes: Vacante[];

  constructor(private _vacanteService: VacanteService) { }

  ngOnInit(): void {
    this._vacanteService.getVacantesHome().subscribe( resp => {
      this.vacantes = resp;
      console.log(resp);
    })
  }

}
