import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/core/model/Response.interface";

export const initIscrizioni = createAction('[Iscrizione] init Iscrizioni', props<{response: Response}>());
export const creaIscrizione = createAction('[Iscrizione] crea Iscrizioni', props<{idTorneo:number,idUtente:number}>());
