import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgwWowModule } from 'ngx-wow';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgwWowModule,
    ModalModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatStepperModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgwWowModule,
    MatTableModule,
    MatSortModule,
    MatStepperModule
  ]
})
export class SharedModule { }
