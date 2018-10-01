import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnSetItemsAction } from '../../components/ingreso-egreso/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubs: Subscription = new Subscription();
  ingresoEgresoItemsListenerSubs: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore,
                public authService: AuthService,
                private store: Store<AppState>) { }


  createIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${ user.uid }/ingreso-egresos`).collection('items').add({ ...ingresoEgreso });
  }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubs = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe(
      auth => this.ingresoEgresoItems(auth.user.uid)
    );
  }

  private ingresoEgresoItems ( uid: string ) {
    this.ingresoEgresoItemsListenerSubs = this.afDB.collection(`${ uid }/ingreso-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( docData => {

          return docData.map( doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });

        })
      )
      .subscribe( (colection: any[]) => {
        this.store.dispatch( new SetItemsAction(colection) );
      });
  }

  cancelarSubscriptions() {
    this.ingresoEgresoListenerSubs.unsubscribe();
    this.ingresoEgresoItemsListenerSubs.unsubscribe();

    this.store.dispatch( new UnSetItemsAction() );

  }

  deleteIngresoEgreso( uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${ user.uid }/ingreso-egresos/items/${ uid }`).delete();
  }

}
