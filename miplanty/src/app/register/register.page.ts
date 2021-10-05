import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name : string;
  mail : string;
  pass : string;
  pass_con : string;
  constructor(private router : Router, private authService : AuthService, public toastController : ToastController) { }

  back(){
    this.router.navigate(['']);
  }

  r_send(){
    if(this.pass == this.pass_con){
      this.authService.signup(this.mail, this.pass).then(resolve => {
        alert("Usuario creado con éxito");
        this.router.navigate(['']);
      }, rejected => {
        this.toasterror("Los datos son incorrectos o ya fueron utilizados");
      });
    }
    else{
      this.toasterror("Las contraseñas no coinciden");
    }
  }

  async toasterror(error : string){
    const toast = await this.toastController.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
