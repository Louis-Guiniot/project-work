import { createReducer, Action, on } from "@ngrx/store";
import { Iscrizione } from "src/app/core/model/Iscrizione";
import { initIscrizioni } from "./iscrizioni.actions";

export interface IscrizioneState {
    arrayIscrizioni: Iscrizione[];
}

export const initialState: IscrizioneState = {
    arrayIscrizioni: [],
    
};

export const iscrizioneReducer = createReducer(
    initialState,
    on(initIscrizioni, (state, { response }) => ({ ...state, arrayIscrizioni: response.result })),
);

export function reducer(state: IscrizioneState, action: Action) {
    return iscrizioneReducer(state, action);
}