import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificaComponent } from './components/classifica/classifica.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MieiTorneiComponent } from './components/miei-tornei/miei-tornei.component';
import { PageNfoundComponent } from './components/page-nfound/page-nfound.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { TorneiComponent } from './components/tornei/tornei.component';
import { LoginGuardService } from './services/loginGuard/login-guard.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profilo', component: ProfiloComponent, canActivate: [LoginGuardService] },
  { path: 'tornei', component: TorneiComponent },
  { path: 'miei-tornei', component: MieiTorneiComponent, canActivate: [LoginGuardService] },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'classifica/:idIscrizione/:idTorneo', component: ClassificaComponent, canActivate: [LoginGuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
