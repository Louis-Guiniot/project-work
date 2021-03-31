import { createReducer, Action, on } from "@ngrx/store";
import { Classifica } from "src/app/core/model/Classifica";
import { initClassifica } from "./classifica.actions";

export interface ClassificaState {
    arrayclassifica: Classifica[];
}

export const initialState: ClassificaState = {
    arrayclassifica: [],
    
};

export const classificaReducer = createReducer(
    initialState,
    on(initClassifica, (state, { response }) => ({ ...state, arrayclassifica: response.result })),
);

export function reducer(state: ClassificaState, action: Action) {
    return classificaReducer(state, action);
}