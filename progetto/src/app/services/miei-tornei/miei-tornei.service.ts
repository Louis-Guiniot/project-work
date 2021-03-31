import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTorneo, deleteTorneo, retreiveAllTornei, retreiveAllTorneiByGioco, retreiveAllTorneiExcept, updateTorneo } from 'src/app/redux/miei-tornei/miei-tornei.actions';

@Injectable({
  providedIn: 'root'
})
export class MieiTorneiService {

  [x: string]: any;

  constructor(private store: Store) { }

  nuovoTorneo(
        nome: string,
        gioco: string,
        piattaforma: string,
        capienza: number,
        capienzaMinima: number,
        partite: number,
        quota: number,
        premioPrimo: string,
        premioSecondo: string,
        premioTerzo: string,
        idCreatore: number,
        stato: string
  ){
    this.store.dispatch(createTorneo({ 
      nome,
      gioco,
      piattaforma,
      capienza,
      capienzaMinima,
      partite,
      quota,
      premioPrimo,
      premioSecondo,
      premioTerzo,
      idCreatore,
      stato}))
  }
  
  eliminaTorneo(id:number){
    this.store.dispatch(deleteTorneo({id}))
  }

  aggiornaTorneo(
    id:number,
    nome: string,
    gioco: string,
    piattaforma: string,
    capienza: number,
    capienzaMinima: number,
    partite: number,
    quota: number,
    premioPrimo: string,
    premioSecondo: string,
    premioTerzo: string,
    stato: string
  ){
    this.store.dispatch(updateTorneo({
      id,
      nome,
      gioco,
      piattaforma,
      capienza,
      capienzaMinima,
      partite,
      quota,
      premioPrimo,
      premioSecondo,
      premioTerzo,
      stato
    }))
  }

  elencoTornei(){
    this.store.dispatch(retreiveAllTornei())
  }

  elencoTorneiPerGioco(gioco:string){
    this.store.dispatch(retreiveAllTorneiByGioco({gioco}))
  }

  elencoTorneiExcept(idCreatore: number){
    this.store.dispatch(retreiveAllTorneiExcept({idCreatore}))
  }

}
