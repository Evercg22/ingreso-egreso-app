import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { IngresoEgresoPipe } from '../../pipes/ingreso-egreso/ingreso-egreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    ShareModule,
    DashboardRoutingModule,
    RouterModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ],
  declarations: [
    DashboardComponent,
    EstadisticaComponent,
    DetalleComponent,
    IngresoEgresoComponent,
    IngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }
