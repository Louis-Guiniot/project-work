import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/core/model/Response.interface";

export const initTornei = createAction('[Torneo] init Tornei', props<{response: Response}>());
export const deleteTorneo = createAction('[Torneo] delete Torneo',props<{id: number}>());
export const updateTorneo = createAction('[Torneo] update Torneo', 
props<{
    id?: number,
    nome: string,
    gioco: string,
    piattaforma: string,
    capienza: number,
    capienzaMinima: number,
    iscrizioni: number,
    postiLiberi: number,
    partite: number,
    quota: number,
    premioPrimo: string,
    premioSecondo: string,
    premioTerzo: string,
    idCreatore: number,
    stato: string,
}>())
export const createTorneo = createAction('[Torneo] creazione Torneo', props<{
    nome: string,
    gioco: string,
    piattaforma: string,
    capienza: number,
    capienzaMinima: number,
    iscrizioni: number,
    postiLiberi: number,
    partite: number,
    quota: number,
    premioPrimo: string,
    premioSecondo: string,
    premioTerzo: string,
    idCreatore: number,
    stato: string,
}>());
export const retreiveAllTornei = createAction('[Torneo] Torneo');
export const retreiveAllTorneiByGioco = createAction('[Torneo] Torneo',props<{gioco: string}>());
export const retreiveAllTorneiByPiattaforma = createAction('[Torneo] Torneo',props<{piattaforma: string}>());
