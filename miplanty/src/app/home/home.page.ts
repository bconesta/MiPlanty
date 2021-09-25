import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private authService : AuthService, public router : Router) { }
  back(){
    this.authService.logout().then(res =>{
      this.router.navigate(['/login']);
    }).catch(err => alert('Los datos son incorrectos'))
    
  }
  
  ngOnInit() {
  }

}
