import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/model/http/http-communications.service";
import { Response } from "src/app/core/model/Response.interface";
import { initClassificaGlobale, retreiveAllClassificaGlobale } from "./classificaGlobale.actions";

@Injectable()
export class ClassificaGlobaleEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    elencoClassificaGlobale(): Observable<Response> {
        return this.http.retrieveGetCall<Response>('classificaGlobale/recordClassificaGlobale');
    }


    getAllElencoClassificaGlobale$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllClassificaGlobale),
        switchMap(() => this.elencoClassificaGlobale()
        .pipe(
            map((response) => initClassificaGlobale({ response }))
        ))
    ));
}


