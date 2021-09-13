import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {
  mail : string;
  constructor(public router : Router) { }
  back(){
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
