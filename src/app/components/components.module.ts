import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { HorarioComponent } from './horario/horario.component';
import { HorariosComponent } from './horarios/horarios.component';




@NgModule({
  declarations: [
    HeaderComponent,
    PostComponent,
    PostsComponent,
    HorarioComponent,
    HorariosComponent

  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    PostsComponent,
    PostComponent,
    HorarioComponent,
    HorariosComponent

  ]
})
export class ComponentsModule { }