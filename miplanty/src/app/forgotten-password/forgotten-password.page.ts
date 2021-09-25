import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {
  mail : string;
  constructor(public router : Router, private authService : AuthService) { }
  back(){
    this.router.navigate(['/']);
  }
  fp_send(){
    this.authService.mailRecovery(this.mail).then(res =>{
      //Enviar a pantalla de confirmación 
      //this.router.navigate(['/tabs/tabs/home']);
      console.log("Enviado");
    }).catch(err => {
      //Analizar error, en caso de ser mail incorrecto, dar aviso
      alert('Los datos son incorrectos')
    })
    
  }

  ngOnInit() {
  }

}
