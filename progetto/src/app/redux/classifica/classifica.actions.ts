import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/core/model/Response.interface";

export const initClassifica = createAction('[Classifica] init Classifica', props<{response: Response}>());
export const retreiveAllRecordsOfClassifica = createAction('[Classifica] Classifica');
