import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { UtenteState } from "./utente.reducers";

export const selectUtenteState = (state: AppState) => state.utenteState;

export const selectUtente = createSelector(
    selectUtenteState,
    (state: UtenteState) => state.arrayUtenti
);

export const getCurrentUtente = createSelector(
    selectUtenteState,
    (state: UtenteState, params: Params) => state.arrayUtenti.find(item => item.id === Number(params['id']))
);