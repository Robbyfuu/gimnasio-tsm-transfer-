import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaHorario,Horario } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';




const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  paginaPosts = 0;
  nuevoPost = new EventEmitter<Horario>();

  constructor(private http:HttpClient,
              private usuarioService:UsuarioService) { }

  getHorario( fecha){

    

    // const headers = new HttpHeaders({
    //   'x-token':this.usuarioService.token
    // });

    return this.http.get<RespuestaHorario>(`${ URL }/horario/getHorario/${fecha}`);
    
    

  }
  deleteHorario(id){
    return this.http.delete<RespuestaHorario>(`${ URL }/horario/getHorario/${id}`);
  }
  crearHorario( horario ) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/horario`, horario, { headers })
        .subscribe( resp => {

          this.nuevoPost.emit( resp['horario'] );
          resolve(true);
        });
    });



  }
  
}
