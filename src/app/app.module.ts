import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

// Modules
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegiterComponent } from './components/auth/regiter/regiter.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresoEgresoComponent } from './components/ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './components/ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './components/ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { SidebarComponent } from './components/share/sidebar/sidebar.component';
import { IngresoEgresoPipe } from './pipes/ingreso-egreso/ingreso-egreso.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegiterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    IngresoEgresoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
