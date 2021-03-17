import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TorneiComponent } from './main/tornei.component';

const routes : Routes = [{path : '', component : TorneiComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TorneiRoutingModule { }
