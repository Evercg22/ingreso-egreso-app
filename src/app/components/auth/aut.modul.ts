import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegiterComponent } from './regiter/regiter.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LoginComponent,
        RegiterComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        AngularFireAuthModule,
        CommonModule,
    ],
    exports: [],
    providers: [],
})
export class AuthModule {}
