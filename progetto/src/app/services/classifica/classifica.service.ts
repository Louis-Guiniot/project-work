import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retreiveAllRecordsOfClassifica, simulaTorneo } from 'src/app/redux/classifica/classifica.actions';

@Injectable({
  providedIn: 'root'
})
export class ClassificaService {


  [x: string]: any;

  constructor(private store: Store) { }

  classifica(){
    this.store.dispatch(retreiveAllRecordsOfClassifica())
  }

  simulazione(idTorneo: number, idUtente:number){
    this.store.dispatch(simulaTorneo({idTorneo, idUtente}))
  }

}
