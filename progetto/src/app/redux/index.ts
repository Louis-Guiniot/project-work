import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { iscrizioneReducer, IscrizioneState } from "./iscrizioni/iscrizioni.reducers";
import { torneoReducer, TorneoState } from "./miei-tornei/miei.tornei.reducers";
import { utenteReducer, UtenteState } from "./utente/utente.reducers";

export interface AppState{
    router: RouterReducerState<any>;
    torneoState: TorneoState,
    utenteState: UtenteState,
    iscrizioneState: IscrizioneState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    torneoState: torneoReducer,
    utenteState: utenteReducer,
    iscrizioneState: iscrizioneReducer
}