import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styles: []
})
export class RegiterComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit( data: any ) {
    console.log(data);
    this.authService.createUser(data.nombre, data.email, data.password);
  }

}
