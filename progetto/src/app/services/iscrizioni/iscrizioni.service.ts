import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IscrizioniService {

  [x: string]: any;

  constructor(private http: HttpClient, private router: Router) { }

  usersUrl = 'http://localhost:8090/project-work-backend/rest/iscrizione/';
  classUrl = 'http://localhost:8090/project-work-backend/rest/classifica/';

  iscriviUtente(idTorneo, idUtente): Observable<any> {
    let c = "iscriviti";
    const valori = {
      idTorneo: idTorneo,
      idUtente: idUtente
    }
    return this.http.post(`${this.usersUrl + c}`, valori);
  }

  simulazione(idTorneo, idUtente, idIscrizione): Observable<any> {
    let c = "simula";
    const valori = {
      idTorneo: idTorneo,
      idUtente: idUtente,
      id: idIscrizione
    }
    console.log(valori)
    return this.http.post(`${this.classUrl + c}`, valori);
  }
}
