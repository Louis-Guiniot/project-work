import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/core/model/Response.interface";

export const initUtenti = createAction('[Utente] init Tornei', props<{response: Response}>());
export const deleteUtente = createAction('[Utente] delete Utente',props<{id: number}>());
export const updateUtente = createAction('[Utente] update Utente', 
props<{
    id?: number,
    nome: string,
    cognome: string,
    username:string,
    password:string,
    email:string,
    genere:string,
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