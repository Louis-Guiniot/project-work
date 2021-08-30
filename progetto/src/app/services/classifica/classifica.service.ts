import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassificaService {


  [x: string]: any;

  constructor(private http: HttpClient) { }

  usersUrl = 'http://localhost:8090/project-work-backend/rest/classifica/';

  getClassifica(idIscrizione: number): Observable<any> {
    let c = 'findClassifica'
    return this.http.get(`${this.usersUrl + c}/${idIscrizione}`);
  }

  getStorico(idUtente: number): Observable<any> {
    let c = 'findStoricoUtente'
    return this.http.get(`${this.usersUrl + c}/${idUtente}`);
  }

}
