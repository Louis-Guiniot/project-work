import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  [x: string]: any;

  constructor(private http: HttpClient) { }

  usersUrl = 'http://localhost:8090/project-work-backend/rest/utente/';

  elencoUtenti(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + 'elencoUtenti');
  }
}
