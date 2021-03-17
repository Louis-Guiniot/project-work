import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpCommunicationsService } from './model/http/http-communications.service';

@NgModule({
  declarations: [],
  providers: [
    HttpCommunicationsService
  ],
  imports: [
    HttpClientModule,
  ]
})
export class CoreModule { }