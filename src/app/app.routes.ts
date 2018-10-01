import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/auth/login/login.component';
import { RegiterComponent } from './components/auth/regiter/regiter.component';
import { AuthGuardService } from './services/auth/auth-guard.service';



const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegiterComponent },
    { 
        path: '', 
        loadChildren: './components/ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canLoad: [ AuthGuardService ]
    },
    { path: '**', redirectTo: ''  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
