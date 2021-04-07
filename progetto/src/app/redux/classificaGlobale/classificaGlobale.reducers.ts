import { createReducer, Action, on } from "@ngrx/store";
import { ClassificaGlobale } from "src/app/core/model/ClassificaGlobale";
import { initClassificaGlobale } from "./classificaGlobale.actions";

export interface ClassificaGlobaleState {
    arrayclassificaGlobale: ClassificaGlobale[];
}

export const initialState: ClassificaGlobaleState = {
    arrayclassificaGlobale: [],
    
};

export const classificaGlobaleReducer = createReducer(
    initialState,
    on(initClassificaGlobale, (state, { response }) => ({ ...state, arrayclassificaGlobale: response.result })),
);

export function reducer(state: ClassificaGlobaleState, action: Action) {
    return classificaGlobaleReducer(state, action);
}