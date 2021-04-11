import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/model/http/http-communications.service";
import { creaIscrizione, initIscrizioni } from "./iscrizioni.actions";
import { Response } from "src/app/core/model/Response.interface";

@Injectable()
export class IscrizioneEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }


    creaIscrizione(
        idTorneo: number,
        idUtente: number
    ): Observable<Response> {
        return this.http.retrievePostCall<Response>('iscrizione/iscriviti', {
            idTorneo,
            idUtente
        });
    }

    creaIscrizione$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(creaIscrizione),
        switchMap((action) => this.creaIscrizione(
            action.idTorneo,
            action.idUtente
        ).pipe(
            map((response) => initIscrizioni({ response }))
            , tap(() => this.router.navigateByUrl('/tornei'))
        ))
    ));
}