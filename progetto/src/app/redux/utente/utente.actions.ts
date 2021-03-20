import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/core/model/Response.interface";
import { Utente } from "src/app/core/model/Utente.interface";

export const initUtenti = createAction('[Utente] init Utenti', props<{response: Response}>());
export const initUtenteLogin = createAction('[Utente] init UtenteLogin', props<{utente: Utente}>());

export const deleteUtente = createAction('[Utente] delete Utente',props<{id: number}>());
export const updateUtente = createAction('[Utente] update Utente', 
props<{
    id?: number,
    nome: string,
    cognome: string,
    username:string,
    password:string,
    email:string,
    datanascita:string
}>())
export const createUtente = createAction('[Utente] creazione Utente', props<{
    nome: string,
    cognome: string,
    username:string,
    password:string,
    email:string,
    genere:string,
    datanascita:string
}>());
export const retreiveAllUtenti = createAction('[Utente] Utente');

export const findUtenteByUsernameAndPassword = createAction('[Utente] login Utente', props<{
    username:string,
    password:string,
}>());

export const loginAdminUserSuccess = createAction('[User] Login Success', props<{admin: Utente}>());
export const loginAdminUserFailure = createAction('[User] Login Failure', props<{error: string}>());
export const initUserAdmin = createAction('[UserInit] init', props<{admin: Utente}>());