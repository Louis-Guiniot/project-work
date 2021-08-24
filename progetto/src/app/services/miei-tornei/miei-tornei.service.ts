import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createTorneo, deleteTorneo, retreiveAllTornei, updateTorneo } from 'src/app/redux/miei-tornei/miei-tornei.actions';

@Injectable({
  providedIn: 'root'
})
export class MieiTorneiService {

  [x: string]: any;

  constructor(private store: Store, private http: HttpClient) { }

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
    descrizione: string
  ) {
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
      descrizione
    }))
  }

  eliminaTorneo(id: number) {
    this.store.dispatch(deleteTorneo({ id }))
  }

  aggiornaTorneo(
    id: number,
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
    descrizione: string

  ) {
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
      descrizione
    }))
  }

  elencoTornei() {
    this.store.dispatch(retreiveAllTornei())
  }

  getMieiTornei(idUtente): Observable<any> {
    const usersUrl = 'http://localhost:8090/project-work-backend/rest/torneo/torneiUtente';
    return this.http.get(`${usersUrl}/${idUtente}`);
  }

  getMieiTorneiFiltrati(stato, idUtente): Observable<any> {
    const usersUrl = 'http://localhost:8090/project-work-backend/rest/torneo/torneiUtenteFiltroStato';
    return this.http.get(`${usersUrl}/${stato}/${idUtente}`);
  }

  getTorneiOnline(): Observable<any> {
    const usersUrl = 'http://localhost:8090/project-work-backend/rest/torneo/torneiOnline';
    return this.http.get(`${usersUrl}`);
  }

  getTorneiOnlineFiltrati(stato): Observable<any> {
    const usersUrl = 'http://localhost:8090/project-work-backend/rest/torneo/torneiOnlineFiltroStato';
    return this.http.get(`${usersUrl}/${stato}`);
  }

}
