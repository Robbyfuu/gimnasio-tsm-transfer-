import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { Usuario, Componente } from '../Interfaces/interfaces';
import { NavController } from '@ionic/angular';





const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  token: string = null;
  private usuario: Usuario = {};
  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController
              ) { }

    login(rut:string , password:string){
      const data = {rut,password}

      let options = {
        headers : { 'Content-Type' : 'application/x-www-form-urlencoded' ,
                    'Access-Control-Allow-Origin':URL,
                    }
    };
        console.log("esta es la data:",data);
      return new Promise(resolve=>{
        this.http.post(`${ URL}/user/login`,data)
        .subscribe( resp =>{
          console.log(resp);

          if(resp['ok']){
           this.guardarToken(resp['token']);
            resolve(true);
          }else{
            this.token= null;
            this.storage.clear();
            resolve(false);
          }
        })


      });

    }
    registro(usuario:Usuario){

      return new Promise(resolve=>{
        this.http.post(`${  URL }/user/create`,usuario)
          .subscribe(  resp=>{
            console.log(resp);
            if(resp['ok']){
              this.guardarToken(resp['token']);
              resolve(true);
            }else{
              this.token= null;
              this.storage.clear();
              resolve(false);
            }


          });

      });
    }
    logout() {
      this.token   = null;
      this.usuario = null;
      this.storage.clear();
      this.navCtrl.navigateRoot('/login', { animated: true });
    }
    
    async guardarToken(token:string){
      this.token= token;
      await this.storage.set('token',token);
      await this.validaToken();
    }
     getMenuOpts(){
       return this.http.get<Componente[]>('../assets/data/menu-opts.json');
    }

    async cargarToken() {

      this.token = await this.storage.get('token') || null;
  
    }

    async validaToken(): Promise<boolean> {

      await this.cargarToken();
  
      if ( !this.token ) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve(false);
      }
  
  
      return new Promise<boolean>( resolve => {
  
        const headers = new HttpHeaders({
          'x-token': this.token
        });
  
        this.http.get(`${ URL }/user/`, { headers })
          .subscribe( resp => {
  
            if ( resp['ok'] ) {
              this.usuario = resp['usuario'];
              resolve(true);
            } else {
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }
  
          });
  
  
      });
  
    }

    
}
