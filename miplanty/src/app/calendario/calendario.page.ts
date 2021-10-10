import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../servicios/auth.service'

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private authService : AuthService, public router : Router) { }

  backHome(){
    this.router.navigate(['/tabs/tabs/home']);
  }

  ngOnInit() {
  }

}
