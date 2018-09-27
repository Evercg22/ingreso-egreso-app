import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styles: []
})
export class RegiterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(public authService: AuthService,
              public store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe(
      ui => this.cargando = ui.isLoading
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit( data: any ) {
    this.authService.createUser(data.nombre, data.email, data.password);
  }

}
