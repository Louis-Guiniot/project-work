import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { torneoReducer, TorneoState } from "./miei-tornei/miei.tornei.reducers";
import { utenteReducer, UtenteState } from "./utente/utente.reducers";

export interface AppState{
    router: RouterReducerState<any>;
    torneoState: TorneoState,
    utenteState: UtenteState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    torneoState: torneoReducer,
    utenteState: utenteReducer
}