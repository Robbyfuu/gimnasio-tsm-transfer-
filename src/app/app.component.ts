import { Component , OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from '../app/Interfaces/interfaces';
import { PostsService } from './services/posts.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  componentes:Observable<Componente[]>;
  constructor(private dataService:UsuarioService,
              private postsService:PostsService) {}
  ngOnInit() {
    this.componentes= this.dataService.getMenuOpts();
  }
  logout() {

    this.postsService.paginaPosts = 0;
    this.dataService.logout();

  }
  
}
