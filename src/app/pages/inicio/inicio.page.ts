import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Componente } from '../../Interfaces/interfaces';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes:Observable<Componente[]>;

  constructor(private menuCtrl:MenuController,
              private dataService:UsuarioService,
              private postsService: PostsService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.componentes= this.dataService.getMenuOpts();
  }
  mostrarMenu(){
      this.menuCtrl.open('first');
  }

  logout() {

    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();

  }

}
