import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retreiveAllUtenti, updateUtente } from 'src/app/redux/utente/utente.actions';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  [x: string]: any;

  constructor(private store: Store) { }

  aggiornaUtente(
    id:number,
    nome: string,
    cognome: string,
    username:string,
    password:string,
    email:string,
    genere:string,
    datanascita:string,
  ){
    this.store.dispatch(updateUtente({
            id,
            nome,
            cognome,
            username,
            password,
            email,
            genere,
            datanascita
    }))
  }

  elencoUtenti(){
    this.store.dispatch(retreiveAllUtenti())
  }
  
}