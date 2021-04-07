import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retreiveAllClassificaGlobale } from 'src/app/redux/classificaGlobale/classificaGlobale.actions';

@Injectable({
  providedIn: 'root'
})
export class ClassificaGlobaleService {

  [x: string]: any;

  constructor(private store: Store) { }

  classificaGlobale(){
    this.store.dispatch(retreiveAllClassificaGlobale())
  }
}
