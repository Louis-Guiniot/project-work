import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassificaService {


  [x: string]: any;

  constructor() { }

  // classifica(){
  //   this.store.dispatch(retreiveAllRecordsOfClassifica())
  // }

  // simulazione(idTorneo: number, idUtente:number){
  //   this.store.dispatch(simulaTorneo({idTorneo, idUtente}))
  // }

}
