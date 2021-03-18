import { Action, createReducer, on } from "@ngrx/store";
import { Utente } from "src/app/core/model/Utente.interface";
import { initUtenti } from "./utente.actions";

export interface UtenteState {
    arrayUtenti: Utente[];
}

export const initialState: UtenteState = {
    arrayUtenti: [],
    
};

export const utenteReducer = createReducer(
    initialState,
    on(initUtenti, (state, { response }) => ({ ...state, arrayUtenti: response.result })),
);

export function reducer(state: UtenteState, action: Action) {
    return utenteReducer(state, action);
}