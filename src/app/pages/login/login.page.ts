import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;


 
  loginUser={
    rut:'18463943-1',
    password:'123456'
  };


  registerUser:Usuario={
    rut: '111111-1',
    password:'123456',
    nombre:'Juan Lopez',
    telefono: 7851232

  };
  constructor(private UsuarioService:UsuarioService,
              private storage: Storage,
              private navCtrl: NavController,
              private UiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
     this.storage.create();
  }
  
  async login (fLogin: NgForm){
    if(fLogin.invalid){return;}

    const valido =await this.UsuarioService.login(this.loginUser.rut,this.loginUser.password);

    if (valido){
      //navegar al menu
      this.navCtrl.navigateRoot('/main', {animated:true});
    }else{
      //aleta usuario contraseña incorrecto
      this.UiService.alertaInformativa("Usuario y/o Contreseña incorrectos")
    }

  }
  async registro (fRegistro:NgForm){

    if(fRegistro.invalid){return};
    const valido= await this.UsuarioService.registro(this.registerUser);

    if (valido){
      //navegar al menu
      this.navCtrl.navigateRoot('/main', {animated:true});
    }else{
      //aleta usuario contraseña incorrecto
      this.UiService.alertaInformativa("El Usuario ya existe");
    }
    
  }
  mostrarRegistro(){

  this.slides.lockSwipes(false);
  this.slides.slideTo(1);
  this.slides.lockSwipes(true);

  }
  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
