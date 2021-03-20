import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { TorneoState } from "./miei.tornei.reducers";

export const selectTorneoState = (state: AppState) => state.torneoState;

export const selectTorneo = createSelector(
    selectTorneoState,
    (state: TorneoState) => state.arrayTornei
);

export const selectTorneoByCreatore = createSelector(
    selectTorneoState,
    (state: TorneoState) => state.arrayTornei
);

export const getCurrentTorneo = createSelector(
    selectTorneoState,
    (state: TorneoState, params: Params) => state.arrayTornei.find(item => item.id === Number(params['id']))
);