import { Component , OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from '../app/Interfaces/interfaces';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  componentes:Observable<Componente[]>;
  constructor(private dataService:UsuarioService) {}
  ngOnInit() {
    this.componentes= this.dataService.getMenuOpts();
  }
  
}
