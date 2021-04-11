import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/model/http/http-communications.service";
import { initClassifica, retreiveAllRecordsOfClassifica, simulaTorneo } from "./classifica.actions";
import { Response } from "src/app/core/model/Response.interface";

@Injectable()
export class ClassificaEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    elencoClassifica(): Observable<Response> {
        return this.http.retrieveGetCall<Response>('classifica/elencoRecordClassifica');
    }

    simulaTorneo(idTorneo: number, idUtente:number): Observable<Response> {
        return this.http.retrievePostCall<Response>('classifica/simula',{idTorneo, idUtente})
    }


    getAllElencoClassifica$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllRecordsOfClassifica),
        switchMap(() => this.elencoClassifica()
        .pipe(
            map((response) => initClassifica({ response }))
        ))
    ));

    createSimulazione$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(simulaTorneo),
        switchMap((action) => this.simulaTorneo(
            action.idTorneo,
            action.idUtente
        ).pipe(
            map((response) => initClassifica({ response }))
        ))
    ));
}


