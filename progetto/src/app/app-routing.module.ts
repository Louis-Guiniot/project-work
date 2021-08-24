import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './services/loginGuard/login-guard.service';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'profilo', loadChildren: () => import('./components/profilo/profilo.module').then(m => m.ProfiloModule), canActivate: [LoginGuardService] },
  { path: 'tornei', loadChildren: () => import('./components/tornei/tornei.module').then(m => m.TorneiModule) },
  { path: 'miei-tornei', loadChildren: () => import('./components/miei-tornei/miei-tornei.module').then(m => m.MieiTorneiModule), canActivate: [LoginGuardService] },
  { path: 'registrazione', loadChildren: () => import('./components/registrazione/registrazione.module').then(m => m.RegistrazioneModule) },
  { path: 'classifica', loadChildren: () => import('./components/classifica/classifica.module').then(m => m.ClassificaModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('./components/page-nfound/page-nfound.module').then(m => m.PageNfoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
