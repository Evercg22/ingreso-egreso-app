import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/auth/login/login.component';
import { RegiterComponent } from './components/auth/regiter/regiter.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './components/dashboard/dashboard.routes';



const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegiterComponent },
    { 
        path: '', 
        component: DashboardComponent,
        children: dashboardRoutes 
    },
    { path: '**', redirectTo: ''  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
