import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassificaGlobaleService {

  [x: string]: any;

  constructor(private http: HttpClient) { }

  // classificaGlobale() {
  //   this.store.dispatch(retreiveAllClassificaGlobale())
  // }
  usersUrl = 'http://localhost:8090/project-work-backend/rest/classificaGlobale';

  elencoClassifica(): Observable<any[]> {
    console.log("service")
    return this.http.get<any[]>(this.usersUrl + '/recordClassificaGlobale');
  }
}
