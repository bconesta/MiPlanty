import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../servicios/auth.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authService : AuthService, public router : Router) { }

  backHome(){
    this.router.navigate(['/tabs/tabs/home']);
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit() {
  }

}
