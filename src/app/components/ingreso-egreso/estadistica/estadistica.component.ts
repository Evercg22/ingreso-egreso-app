import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import * as fromIngresoEgresoState from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

   // Doughnut
   public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
   public doughnutChartData: number[] = [];

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  constructor( private store: Store<fromIngresoEgresoState.AppStat> ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe( ingresEgreso => {
        this.contarIngresoEgreso( ingresEgreso.items );
      });
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {
    
    this.ingresos = 0;
    this.egresos = 0;
    
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {
      if ( item.tipo === 'Ingreso') {
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [ this.ingresos, this.egresos];

  }

}
