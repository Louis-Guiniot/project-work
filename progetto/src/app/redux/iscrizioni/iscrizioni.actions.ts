import { createAction, props } from "@ngrx/store";
import { Iscrizione } from "src/app/core/model/Iscrizione";
import { Response } from "src/app/core/model/Response.interface";

export const initIscrizioni = createAction('[Iscrizione] init Iscrizioni', props<{response: Response}>());
export const creaIscrizione = createAction('[Iscrizione] crea Iscrizioni', props<{idTorneo:number,idUtente:number}>());
export const iscrizioneSuccess = createAction('[Iscrizione] Iscrizione Success', props<{admin: Iscrizione}>());
export const iscrizioneFailure = createAction('[Iscrizione] Iscrizione Failure', props<{error: string}>());
export const initIscrizioneAdmin = createAction('[UserInit] init', props<{admin: Iscrizione}>());