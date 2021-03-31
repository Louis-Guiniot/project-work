import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ClassificaState } from "./classifica.reducers";

export const selectClassificaState = (state: AppState) => state.classificaState;

export const selectClassifica = createSelector(
    selectClassificaState,
    (state: ClassificaState) => state.arrayclassifica
);

export const getCurrentClassifica = createSelector(
    selectClassificaState,
    (state: ClassificaState, params: Params) => state.arrayclassifica.find(item => item.id === Number(params['id']))
);