import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as fromFire from 'firebase';
import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private roter: Router,
              private afDB: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(
      (fbUser: fromFire.User) => {
        console.log(fbUser);
        
      }
    );
  }

  createUser ( name: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      resp => {
        const user: User = {
          uid: resp.user.uid,
          name,
          email: resp.user.email,
        };
  
        this.afDB.doc(`${ user.uid }/usuario`).set( user ).then(
          () => {
            this.roter.navigate(['/']);
          }
        ).catch(
          error => {
            swal('Error en el login', error.message, 'error');
          }
        );
        
      }
    ).catch(
      error => {
        console.error(error);
        swal('Error en el login', 'Usuario o contrasena incorrectos', 'error');
      }
    );
  }

  login (email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      resp => {
        this.roter.navigate(['/']);
      }
    ).catch(
      error => {
        console.error(error);
        swal('Error en el login', error.message, 'error');
        
      }
    );
  }

  logOut() {
    this.roter.navigate(['/login']);
    this.afAuth.auth.signOut();
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

}
