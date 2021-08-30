import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoreModule } from 'src/app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassificaComponent } from './components/classifica/classifica.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MieiTorneiComponent } from './components/miei-tornei/miei-tornei.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNfoundComponent } from './components/page-nfound/page-nfound.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { TorneiComponent } from './components/tornei/tornei.component';
import { IscrizioneComponent } from './contents/iscrizione/iscrizione.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfiloComponent,
    TorneiComponent,
    MieiTorneiComponent,
    NavBarComponent,
    RegistrazioneComponent,
    PageNfoundComponent,
    ClassificaComponent,
    IscrizioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
