import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MieiTorneiRoutingModule } from './miei-tornei-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    MieiTorneiRoutingModule
  ]
})
export class MieiTorneiModule { }
