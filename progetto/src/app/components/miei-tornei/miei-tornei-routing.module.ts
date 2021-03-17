import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MieiTorneiComponent } from './main/miei-tornei.component';

const routes : Routes = [{path : '', component : MieiTorneiComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MieiTorneiRoutingModule { }
