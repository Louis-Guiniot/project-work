import { Injectable } from "@angular/core"
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/model/http/http-communications.service";
import { createUtente, deleteUtente, findUtenteByUsernameAndPassword, initUserAdmin, initUtenti, loginAdminUserFailure, loginAdminUserSuccess, retreiveAllUtenti, updateUtente } from "./utente.actions";
import { Response } from "src/app/core/model/Response.interface";

@Injectable()
export class UtenteEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllUtenti(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("utente/elencoUtenti");
    }

    createUtente(
        nome: string,
        cognome: string,
        username:string,
        password:string,
        email:string,
        genere:string,
        datanascita:string
    ): Observable<Response> {
        return this.http.retrievePostCall<Response>('utente/creaUtente', {
            nome,
            cognome,
            username,
            password,
            email,
            genere,
            datanascita

        });
    }

    updateUtente(
        id: number,
        nome: string,
        cognome: string,
        username:string,
        password:string,
        email:string,
        datanascita:string
    ): Observable<Response> {
        return this.http.retrievePostCall<Response>('utente/aggiornaUtente', {
            id,
            nome,
            cognome,
            username,
            password,
            email,
            datanascita
        });
    }

    findUtenteByUsernameAndPassword(
        username:string,
        password:string,
    ): Observable<Response> {
        return this.http.retrievePostCall<Response>('utente/findUtente', {
            username,
            password,
        });
    }

    deleteUtente(id: number): Observable<Response> {
        return this.http.retrievePostCall<Response>('utente/deleteUtente', { id });
    }

    findUpdateUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateUtente),
        switchMap((action) => this.updateUtente(
            action.id,
            action.nome,
            action.cognome,
            action.username,
            action.email,
            action.password,
            action.datanascita,
            ).pipe(
                map((response) => initUtenti({ response }))
                , tap(() => this.router.navigateByUrl('/profilo'))
            ))
    ));

    createUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createUtente),
        switchMap((action) => this.createUtente(
            action.nome,
            action.cognome,
            action.username,
            action.email,
            action.password,
            action.genere,
            action.datanascita,
            ).pipe(
                map((response) => initUtenti({ response }))
                , tap(() => this.router.navigateByUrl('/home'))
            ))
    ));

    deleteUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteUtente),
        switchMap((action) => this.deleteUtente(
            action.id).pipe(
                map((response) => initUtenti({ response }))
                , tap(() => this.router.navigateByUrl('/login'))
            ))
    ));

    getAllUtenti$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllUtenti),
        switchMap(() => this.retreiveAllUtenti().pipe(
            map((response) => initUtenti({ response }))
        ))
    ));

    loginAdmin$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(findUtenteByUsernameAndPassword),
        switchMap((action) => this.findUtenteByUsernameAndPassword(
            action.username,
            action.password
        ).pipe(
            map((response) => {
                if(response.result === null){
                  return loginAdminUserFailure({error:'Username e/o Password non corretta'})
                }else{
                    sessionStorage.setItem('username',action.username)
                    sessionStorage.setItem('id',response.result.id)
                    return loginAdminUserSuccess({admin: response.result})
                }
              })
        ))
    ));
  

//******************************/
loginUserSuccess$=createEffect(()=>this.actions$.pipe(
    ofType(loginAdminUserSuccess),
    map( (action) => initUserAdmin( {admin: action.admin} )),
    tap(()=>this.router.navigateByUrl('/home'))
  ));
}
