import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservarHoraPageRoutingModule } from './reservar-hora-routing.module';

import { ReservarHoraPage } from './reservar-hora.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservarHoraPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReservarHoraPage]
})
export class ReservarHoraPageModule {}
