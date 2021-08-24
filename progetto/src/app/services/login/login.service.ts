import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  [x: string]: any;

  constructor(private store: Store, private http: HttpClient) { }

  usersUrl: any;

  elencoUtenti(): Observable<any[]> {
    this.usersUrl = 'http://localhost:8090/project-work-backend/rest/utente';
    return this.http.get<any[]>(this.usersUrl + '/elencoUtenti');
  }

  loginUtente(username: string, password: string): Observable<any> {
    this.usersUrl = 'http://localhost:8090/project-work-backend/rest/utente/findUtente';
    return this.http.get(`${this.usersUrl}/${username}/${password}`);
  }

  checkEmail(email: string): Observable<any> {
    this.usersUrl = 'http://localhost:8090/project-work-backend/rest/utente/findUtenteEmail';
    return this.http.get(`${this.usersUrl}/${email}`);
  }

  updateUtente(valori): Observable<any> {
    this.usersUrl = 'http://localhost:8090/project-work-backend/rest/utente/aggiornaUtente';
    return this.http.post(`${this.usersUrl}`, valori);
  }

  registraUtente(valori): Observable<any> {
    this.usersUrl = 'http://localhost:8090/project-work-backend/rest/utente/registraUtente';
    return this.http.post(`${this.usersUrl}`, valori);
  }

}
