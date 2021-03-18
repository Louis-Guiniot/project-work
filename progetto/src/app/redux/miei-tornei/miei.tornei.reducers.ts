import { createReducer, Action, on } from "@ngrx/store";
import { Torneo } from "src/app/core/model/Torneo.interface";
import { initTornei } from "./miei-tornei.actions";

export interface TorneoState {
    arrayTornei: Torneo[];
}

export const initialState: TorneoState = {
    arrayTornei: [],
    
};

export const torneoReducer = createReducer(
    initialState,
    on(initTornei, (state, { response }) => ({ ...state, arrayTornei: response.result })),
);

export function reducer(state: TorneoState, action: Action) {
    return torneoReducer(state, action);
}