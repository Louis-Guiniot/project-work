import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNfoundComponent } from './main/page-nfound.component';
import { Routes, RouterModule } from '@angular/router';


const routes : Routes = [{path : '', component : PageNfoundComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNfoundRoutingModule { }
