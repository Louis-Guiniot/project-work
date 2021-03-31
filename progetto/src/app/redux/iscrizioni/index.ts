import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { IscrizioneState } from "./iscrizioni.reducers";

export const selectIscrizioneState = (state: AppState) => state.iscrizioneState;

export const selectIscrizione = createSelector(
    selectIscrizioneState,
    (state: IscrizioneState) => state.arrayIscrizioni
);

export const selectIscrizioneByCreatore = createSelector(
    selectIscrizioneState,
    (state: IscrizioneState) => state.arrayIscrizioni
);

export const getCurrentIscrizione = createSelector(
    selectIscrizioneState,
    (state: IscrizioneState, params: Params) => state.arrayIscrizioni.find(item => item.id === Number(params['id']))
);