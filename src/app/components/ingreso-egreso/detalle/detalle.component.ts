import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../../services/ingres-egreso/ingreso-egreso.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor( private store: Store< fromIngresoEgreso.AppStat >, 
                public ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe( ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ) {
    this.ingresoEgresoService.deleteIngresoEgreso( item.uid )
      .then(
        resp => {
          swal({
            title: 'Eliminación', 
            text: `Item ${ item.descripcion } eliminado correctamente`, 
            type: 'success', 
            showConfirmButton: false, 
            timer: 1500});
        }
      );
  }



}
