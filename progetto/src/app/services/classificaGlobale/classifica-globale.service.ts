import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { retreiveAllClassificaGlobale } from 'src/app/redux/classificaGlobale/classificaGlobale.actions';

@Injectable({
  providedIn: 'root'
})
export class ClassificaGlobaleService {

  [x: string]: any;

  constructor(private store: Store, private http: HttpClient) { }

  classificaGlobale() {
    this.store.dispatch(retreiveAllClassificaGlobale())
  }
  usersUrl = 'http://localhost:8090/project-work-backend/rest/classificaGlobale';

  elencoClassifica(): Observable<any[]> {
    console.log("service")
    return this.http.get<any[]>(this.usersUrl + '/recordClassificaGlobale');
  }
}
