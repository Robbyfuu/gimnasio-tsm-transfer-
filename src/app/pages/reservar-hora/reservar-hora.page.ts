import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime  } from '@ionic/angular';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Horario } from 'src/app/Interfaces/interfaces';
import { HorarioService } from '../../services/horario.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-reservar-hora',
  templateUrl: './reservar-hora.page.html',
  styleUrls: ['./reservar-hora.page.scss'],
})
export class ReservarHoraPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  dateValue = '';
  dateValue2 = '';
  today: any;
  post = {
    fecha: '',
    horario:''
    
  };
  Horario: Horario[]= [];
  idHorario='';
  isClick: boolean=false;
  

  
  constructor(private postsService: PostsService,
              private route: Router,
              private horarioService:HorarioService,
              private alertController:AlertController) { }
  confirm() {
    this.datetime.confirm();
  }
  
  reset() {
    this.datetime.reset();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd-MM-yyyy');
  }

  isDateEnabled(dateIsoString: string) {
    const date = new Date(dateIsoString);
    if (getDate(date) === 1 && getMonth(date) === 0 && getYear(date) === 2022) {
      // Disables January 1, 2022.
      return false;
    }
    return true;
  }
  cambioFecha(event){
    console.log(event);
    
  }
  async crearPost() {

    console.log(this.post);
    const creado = await this.postsService.crearPost( this.post );

    this.post = {
      fecha:'',
      horario:''
    };

   

    this.route.navigateByUrl('/reservas');

  }
  
  getDate() { 
    const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    
    console.log(this.today); }

   getHorario(){

    while(this.Horario.length>0){
      this.Horario.pop();
    }

    this.horarioService.getHorario(this.dateValue2)
    .subscribe(resp=>{
      console.log(resp);
      this.Horario.push(...resp.horarioPost);

    })
      
    console.log(this.dateValue2);
        

  }

  deleteHorario(){
    this.horarioService.deleteHorario(this.idHorario)
      .subscribe(resp =>{
        console.log(resp);
      })
    console.log(this.idHorario);
  }
  onHorario(value: string) {
    console.log(value);
    return this.idHorario = value;
  }
  isClicked(){
    return this.isClick;
   }
   
   onClick(){
    this.isClick=!this.isClick;
   }
   async presentAlert() {
    const alert = await this.alertController.create({
      
      header: 'Confirmar Hora',
      //subHeader: 'Subtitle',
      message: 'Estas confirmando para la fecha '+this.post.fecha+' y el horario '+this.post.horario,
      buttons: [{
        text:'Confirmo',
        handler: ()=> {
          console.log(this.post, this.idHorario);
          
          this.crearPost();

          this.deleteHorario();

          this.post = {
            fecha:'',
            horario:''
          };
          this.dateValue2='';
        }
      },
      {
        text:'Cancelar',
        role:'cancel',
        cssClass:'red'
      }
      ]
    });

    await alert.present();
  }

  
  
  ngOnInit() {
    this.getDate();
    this.horarioService.getHorario(this.today)
      .subscribe(resp=>{
        console.log(resp);
        this.Horario.push(...resp.horarioPost);       
       

      })
  }

}
