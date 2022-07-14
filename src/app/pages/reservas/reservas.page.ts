import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { HorarioService } from 'src/app/services/horario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from '../../Interfaces/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  posts: Post[]= [];
  
  horario = {
    fecha: '',
    horario:''
    
  };
  idPost='';
  today: any;
  pipe = new DatePipe('en-US');
  changedDate = '';
  
  constructor(private PostsService : PostsService,
              private horarioService: HorarioService,
              private alertController:AlertController,
              private route: Router) { }

  async crearHorario() {

    console.log(this.horario);
    const creado = await this.horarioService.crearHorario( this.horario );

    this.horario = {
      fecha:'',
      horario:''
    };
    
  }
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      
      header: 'Anular Reserva',
      //subHeader: 'Subtitle',
      message: '¿Estás seguro de anular tu hora reservada? ',
      buttons: [{
        text:'Si',
        handler: ()=> {
          console.log(this.horario, this.idPost);
          const creado =  this.horarioService.crearHorario( this.horario );
          this.deletePost();
          
          

          this.horario = {
            fecha:'',
            horario:''
          };
          
          this.route.navigateByUrl('/main');
        }
      },
      {
        text:'Cancelar',
        role:'cancel',
        cssClass:'rojo'
      }
      ]
    });

    await alert.present();
  }
  // getPost(){
  //   while(this.posts.length>0){
  //     this.posts.pop();
  //   }
  // }
  deletePost(){
    this.PostsService.deletePost(this.idPost)
      .subscribe(resp =>{
        console.log(resp);
      })
    console.log(this.idPost);
  }
  ngOnInit(event?) {
    this.getDate();
    this.cambioFormato();
    while(this.posts.length>0){
      this.posts.pop();
    }
    this.PostsService.getPosts()
      .subscribe(  resp => {
        console.log(resp);
        this.posts.push(...resp.posts);
      })

  }
  doRefresh(event){
    this.ngOnInit(event);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);

  }
  getDate(){

    const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    

  }
  cambioFormato(){
    let ChangedFormat = this.pipe.transform(this.today, 'dd-MM-YYYY');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
  }

}
