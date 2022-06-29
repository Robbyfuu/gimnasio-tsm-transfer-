import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReservarHoraPage } from './reservar-hora.page';

const routes: Routes = [
  {
    path: '',
    component: ReservarHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule,FormsModule],
  exports: [RouterModule],
})
export class ReservarHoraPageRoutingModule {}
