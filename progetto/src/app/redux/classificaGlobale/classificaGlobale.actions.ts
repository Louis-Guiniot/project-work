import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/core/model/Response.interface";

export const initClassificaGlobale = createAction('[ClassificaGlobale] init ClassificaGlobale', props<{response: Response}>());
export const retreiveAllClassificaGlobale = createAction('[ClassificaGlobale] ClassificaGlobale');
