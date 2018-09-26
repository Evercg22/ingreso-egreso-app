import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ingresoEgresoApp';
  
  constructor(public athService: AuthService) {}

  ngOnInit() {
    this.athService.initAuthListener();
  }
}
