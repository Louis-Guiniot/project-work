import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/main/home.component';
import { LoginComponent } from './components/login/main/login.component';
import { ProfiloComponent } from './components/profilo/main/profilo.component';
import { TorneiComponent } from './components/tornei/main/tornei.component';
import { MieiTorneiComponent } from './components/miei-tornei/main/miei-tornei.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux';
import { TorneoEffects } from './redux/miei-tornei/miei-tornei.effect';
import { UtenteEffects } from './redux/utente/utente.effects';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfiloComponent,
    TorneiComponent,
    MieiTorneiComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot(reducers),
     EffectsModule.forRoot([
      TorneoEffects, 
      UtenteEffects,
     ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
