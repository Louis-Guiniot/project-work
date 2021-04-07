import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ClassificaGlobaleState } from "./classificaGlobale.reducers";

export const selectClassificaGlobaleState = (state: AppState) => state.classificaGlobaleState;

export const selectClassificaGlobale = createSelector(
    selectClassificaGlobaleState,
    (state: ClassificaGlobaleState) => state.arrayclassificaGlobale
);

export const getCurrentClassificaGlobale = createSelector(
    selectClassificaGlobaleState,
    (state: ClassificaGlobaleState, params: Params) => state.arrayclassificaGlobale.find(item => item.id === Number(params['id']))
);