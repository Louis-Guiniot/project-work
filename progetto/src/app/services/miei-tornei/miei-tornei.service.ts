import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MieiTorneiService {

  [x: string]: any;

  constructor(private http: HttpClient) { }

  usersUrl = 'http://localhost:8090/project-work-backend/rest/torneo/';

  getMieiTornei(idUtente): Observable<any> {
    let c = "torneiUtente";
    return this.http.get(`${this.usersUrl + c}/${idUtente}`);
  }

  getMieiTorneiFiltrati(stato, idUtente): Observable<any> {
    let c = "torneiUtenteFiltroStato";
    return this.http.get(`${this.usersUrl + c}/${stato}/${idUtente}`);
  }

  getTorneiOnline(): Observable<any> {
    let c = "torneiOnline";
    return this.http.get(`${this.usersUrl + c}`);
  }

  getTorneiOnlineFiltrati(stato): Observable<any> {
    let c = "torneiOnlineFiltroStato";
    return this.http.get(`${this.usersUrl + c}/${stato}`);
  }

}
