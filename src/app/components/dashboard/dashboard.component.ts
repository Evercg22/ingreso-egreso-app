import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../../services/ingres-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( public ingresoEgService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgService.initIngresoEgresoListener();
  }


}
