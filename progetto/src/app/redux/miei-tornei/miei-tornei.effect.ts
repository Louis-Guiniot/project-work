import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/model/http/http-communications.service";
import { createTorneo, deleteTorneo, initTornei, retreiveAllTornei, updateTorneo } from "./miei-tornei.actions";
import { Response } from "src/app/core/model/Response.interface";

@Injectable()
export class TorneoEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllTornei(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("torneo/elencoTornei");
    }

    createTorneo(
        nome: string,
        gioco: string,
        piattaforma: string,
        capienza: number,
        capienzaMinima: number,
        partite: number,
        quota: number,
        premioPrimo: string,
        premioSecondo: string,
        premioTerzo: string,
        idCreatore: number,
        descrizione: string
    ): Observable<Response> {
        return this.http.retrievePostCall<Response>('torneo/creaTorneo', {
            nome,
            gioco,
            piattaforma,
            capienza,
            capienzaMinima,
            partite,
            quota,
            premioPrimo,
            premioSecondo,
            premioTerzo,
            idCreatore,
            descrizione
        });
    }

    findUpdateTorneo(
        id: number,
        nome: string,
        gioco: string,
        piattaforma: string,
        capienza: number,
        capienzaMinima: number,
        partite: number,
        quota: number,
        premioPrimo: string,
        premioSecondo: string,
        premioTerzo: string,
        descrizione: string
    ) {
        return this.http.retrievePostCall<Response>('torneo/aggiornaTorneo', {
            id,
            nome,
            gioco,
            piattaforma,
            capienza,
            capienzaMinima,
            partite,
            quota,
            premioPrimo,
            premioSecondo,
            premioTerzo,
            descrizione
        });
    }

    deleteTorneo(id: number): Observable<Response> {
        return this.http.retrievePostCall<Response>('torneo/eliminaTorneo', { id });
    }

    findUpdateTorneo$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateTorneo),
        switchMap((action) => this.findUpdateTorneo(
            action.id,
            action.nome,
            action.gioco,
            action.piattaforma,
            action.capienza,
            action.capienzaMinima,
            action.partite,
            action.quota,
            action.premioPrimo,
            action.premioSecondo,
            action.premioTerzo,
            action.descrizione).pipe(
                map((response) => initTornei({ response }))
                , tap(() => window.location.reload())
            ))
    ));

    deleteTorneo$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteTorneo),
        switchMap((action) => this.deleteTorneo(
            action.id).pipe(
                map((response) => initTornei({ response }))
                , tap(() => this.router.navigateByUrl('/miei-tornei'))
            ))
    ));

    getAllTornei$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllTornei),
        switchMap(() => this.retreiveAllTornei().pipe(
            map((response) => initTornei({ response }))
        ))
    ));

    createTorneo$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createTorneo),
        switchMap((action) => this.createTorneo(
            action.nome,
            action.gioco,
            action.piattaforma,
            action.capienza,
            action.capienzaMinima,
            action.partite,
            action.quota,
            action.premioPrimo,
            action.premioSecondo,
            action.premioTerzo,
            action.idCreatore,
            action.descrizione
        ).pipe(
            map((response) => initTornei({ response }))
            ,tap(() => window.location.reload())
        ))
    ));
}