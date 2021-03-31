import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { creaIscrizione } from 'src/app/redux/iscrizioni/iscrizioni.actions';

@Injectable({
  providedIn: 'root'
})
export class IscrizioniService {

  [x: string]: any;

  constructor(private store: Store) { }

  iscriviUtente(
    idTorneo:number,
    idUtente: number,
  ){
    this.store.dispatch(creaIscrizione({
      idTorneo,
      idUtente,
    }))
  }

}
