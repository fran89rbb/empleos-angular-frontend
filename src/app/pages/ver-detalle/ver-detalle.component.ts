import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacante } from 'src/app/models/vacante';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styles: [
  ]
})
export class VerDetalleComponent implements OnInit {

  vacante: Vacante;

  constructor(private activatedRoute: ActivatedRoute, private _vacanteService: VacanteService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let id:number = +params.get('id');

      if(id){
        this._vacanteService.getVacante(id).subscribe( resp => {
          this.vacante = resp;
          console.log(resp);
        });
      }
    });
  }

}
