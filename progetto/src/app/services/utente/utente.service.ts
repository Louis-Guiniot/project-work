import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateUtente } from 'src/app/redux/utente/utente.actions';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  [x: string]: any;

  constructor(private store: Store, private http: HttpClient) { }

  aggiornaUtente(
    id: number,
    nome: string,
    cognome: string,
    username: string,
    password: string,
    email: string,
    genere: string,
    datanascita: string,
  ) {
    this.store.dispatch(updateUtente({
      id,
      nome,
      cognome,
      username,
      password,
      email, genere
    }))
  }

  // elencoUtenti() {
  //   this.store.dispatch(retreiveAllUtenti())
  // }

  usersUrl = 'http://localhost:8090/project-work-backend/rest/utente/';

  elencoUtenti(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + 'elencoUtenti');
  }
}
