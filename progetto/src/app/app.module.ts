import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgwWowModule } from 'ngx-wow';
import { CoreModule } from 'src/app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassificaComponent } from './components/classifica/main/classifica.component';
import { HomeComponent } from './components/home/main/home.component';
import { LoginComponent } from './components/login/main/login.component';
import { MieiTorneiComponent } from './components/miei-tornei/main/miei-tornei.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNfoundComponent } from './components/page-nfound/main/page-nfound.component';
import { ProfiloComponent } from './components/profilo/main/profilo.component';
import { RegistrazioneComponent } from './components/registrazione/main/registrazione.component';
import { TorneiComponent } from './components/tornei/main/tornei.component';
import { reducers } from './redux';
import { ClassificaEffects } from './redux/classifica/classifica.effects';
import { ClassificaGlobaleEffects } from './redux/classificaGlobale/classificaGlobale.effects';
import { IscrizioneEffects } from './redux/iscrizioni/iscrizioni.effects';
import { TorneoEffects } from './redux/miei-tornei/miei-tornei.effect';
import { UtenteEffects } from './redux/utente/utente.effects';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    NgwWowModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      TorneoEffects,
      UtenteEffects,
      IscrizioneEffects,
      ClassificaEffects,
      ClassificaGlobaleEffects,
    ]),
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
