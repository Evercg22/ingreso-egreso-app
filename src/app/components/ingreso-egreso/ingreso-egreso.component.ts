import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingres-egreso/ingreso-egreso.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from '../ingreso-egreso/ingreso-egreso.reducer';
import { ActivarLodingAction, DesactivarLodingAction } from '../share/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'Ingreso';

  ladingSubscription: Subscription = new Subscription();

  loading: boolean;

  constructor( public ingresoEgresoService: IngresoEgresoService,
                private store: Store< fromIngresoEgreso.AppStat>) { }

  ngOnInit() {

    this.ladingSubscription = this.store.select('ui').subscribe(
      ui => this.loading = ui.isLoading
    );

    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(1)),

    });
  }

  ngOnDestroy() {
    this.ladingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch( new ActivarLodingAction() );
    const ingresoEgreso = new IngresoEgreso( { ...this.form.value, tipo: this.tipo} );
    this.ingresoEgresoService.createIngresoEgreso( ingresoEgreso ).then(
      resp => {
        this.store.dispatch( new DesactivarLodingAction() );
        swal({
          title: this.tipo + ' Creado', 
          text: ingresoEgreso.descripcion, 
          type: 'success', 
          showConfirmButton: false, 
          timer: 1500});
        this.form.reset({
          monto: 0
        });
    }).catch(
      err => console.log(err)
    );
    
  }

}
