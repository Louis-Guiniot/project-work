import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUtente, retreiveAllUtenti, updateUtente } from 'src/app/redux/utente/utente.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  [x: string]: any;

  constructor(private store: Store) { }

  nuovoUtente(
    nome: string,
    cognome: string,
    username:string,
    password:string,
    email:string,
    genere:string,
    datanascita:string,
  ){
    this.store.dispatch(createUtente({
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
