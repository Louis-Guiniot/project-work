import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificaComponent } from './main/classifica.component';
import { Routes, RouterModule } from '@angular/router';

const routes : Routes = [{path : '' , component : ClassificaComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificaRoutingModule { }
