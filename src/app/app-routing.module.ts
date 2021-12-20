import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/vacantes/form.component';
import { VacantesComponent } from './pages/vacantes/vacantes.component';
import { VerDetalleComponent } from './pages/ver-detalle/ver-detalle.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'verDetalle/:id', component: VerDetalleComponent },
  { path: 'vacantes', component: VacantesComponent },
  { path: 'vacantes/form', component: FormComponent },
  { path: 'vacantes/form/:id', component: FormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
