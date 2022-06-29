import { Component, OnInit, Input } from '@angular/core';
import { Horario } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
})
export class HorariosComponent implements OnInit {

  @Input() horarios :Horario[]=[];
  
  
  constructor() { }

  ngOnInit() {

    console.log(this.horarios);
  }

}
