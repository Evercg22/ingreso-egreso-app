import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../../services/ingres-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  name: string;
  subsctipcion: Subscription = new Subscription();

  constructor(public authService: AuthService, 
                private store: Store<AppState>,
                public ingresoEgresoSevice: IngresoEgresoService) { }

  ngOnInit() {
    this.subsctipcion = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe(
        auth => this.name = auth.user.name
      );
  }

  ngOnDestroy() {
    this.subsctipcion.unsubscribe();
  }

  logOut() {
    this.authService.logOut();
    this.ingresoEgresoSevice.cancelarSubscriptions();
  }

}
