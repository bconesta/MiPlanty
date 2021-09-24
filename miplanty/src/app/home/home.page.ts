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
  public imgcentro = '../../assets/imgs/phomeCENTRAL.png'
  public textplanta = "PLANTA";
  back(){
    this.router.navigate(['/'])
  }

  new(){
    this.router.navigate(['/tabs/tabs/tab2'])
  }

  changeImgD(){
    if(this.imgcentro=='../../assets/imgs/phomeCENTRAL.png')
    {
      this.imgcentro='../../assets/imgs/phomeCACTUS.png';
      this.textplanta = 'CACTUS';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeCACTUS.png')
    {
      this.imgcentro='../../assets/imgs/phomeLUZ.png';
      this.textplanta='DE LUZ';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeLUZ.png')
    {
      this.imgcentro='../../assets/imgs/phomeSOMBRA.png';
      this.textplanta='DE SOMBRA';
    }
    else 
    {
      this.imgcentro='../../assets/imgs/phomeCENTRAL.png';
      this.textplanta='PLANTA';
    }
  }

  changeImgI(){
    if(this.imgcentro=='../../assets/imgs/phomeCENTRAL.png')
    {
      this.imgcentro='../../assets/imgs/phomeSOMBRA.png';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeSOMBRA.png')
    {
      this.imgcentro='../../assets/imgs/phomeLUZ.png';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeLUZ.png')
    {
      this.imgcentro='../../assets/imgs/phomeCACTUS.png';
    }
    else 
    {
      this.imgcentro='../../assets/imgs/phomeCENTRAL.png';
    }
  }
  
  ngOnInit() {
  }

}
