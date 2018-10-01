import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as fromFire from 'firebase';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ActivarLodingAction, DesactivarLodingAction } from '../../components/share/ui.actions';
import { SetUserAction, UnSetUserAction } from '../../components/auth/auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: User;


  private userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private roter: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(
      (fbUser: fromFire.User) => {
        if ( fbUser ) {
          this.userSubscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges().subscribe(
            (usuarioObj: any) => {
              const newUser = new User( usuarioObj );
              this.usuario = newUser;
              this.store.dispatch( new SetUserAction( newUser ) );
            }
          );
        } else {
          this.usuario = null;
          this.userSubscription.unsubscribe();
        }
      }
    );
  }

  createUser ( name: string, email: string, password: string) {
    this.store.dispatch( new ActivarLodingAction() );

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      resp => {
        const user: User = {
          uid: resp.user.uid,
          name,
          email: resp.user.email,
        };
  
        this.afDB.doc(`${ user.uid }/usuario`).set( user ).then(
          () => {
            this.store.dispatch( new DesactivarLodingAction() );
            this.roter.navigate(['/']);
          }
        ).catch(
          error => {
            this.store.dispatch( new DesactivarLodingAction() );
            swal('Error en el login', error.message, 'error');
          }
        );
        
      }
    ).catch(
      error => {
        this.store.dispatch( new DesactivarLodingAction() );
        swal('Error en el login', 'Usuario o contrasena incorrectos', 'error');
      }
    );
  }

  login (email: string, password: string) {
    this.store.dispatch( new ActivarLodingAction() );
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      resp => {
        this.store.dispatch( new DesactivarLodingAction() );
        this.roter.navigate(['/']);
      }
    ).catch(
      error => {
        this.store.dispatch( new DesactivarLodingAction() );
        swal('Error en el login', error.message, 'error');
        
      }
    );
  }

  logOut() {
    this.roter.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch( new UnSetUserAction() );
    
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map( fbUSer => {
        if (fbUSer == null) {
          this.roter.navigate(['/login']);
        }
        return fbUSer != null;
      })
    );
  }

  getUser() {
    return { ...this.usuario };
  }

}
