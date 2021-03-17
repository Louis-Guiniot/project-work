import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
  {path:'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
  {path:'profile', loadChildren: () => import('./components/profilo/profilo.module').then(m => m.ProfiloModule)},
  {path:'tornei', loadChildren: () => import('./components/tornei/tornei.module').then(m => m.TorneiModule)},
  {path:'miei-tornei', loadChildren: () => import('./components/miei-tornei/miei-tornei.module').then(m => m.MieiTorneiModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
