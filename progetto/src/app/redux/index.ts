import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { classificaReducer, ClassificaState } from "./classifica/classifica.reducers";
import { classificaGlobaleReducer, ClassificaGlobaleState } from "./classificaGlobale/classificaGlobale.reducers";
import { iscrizioneReducer, IscrizioneState } from "./iscrizioni/iscrizioni.reducers";
import { torneoReducer, TorneoState } from "./miei-tornei/miei.tornei.reducers";
import { utenteReducer, UtenteState } from "./utente/utente.reducers";

export interface AppState{
    router: RouterReducerState<any>;
    torneoState: TorneoState,
    utenteState: UtenteState,
    iscrizioneState: IscrizioneState,
    classificaState: ClassificaState, 
    classificaGlobaleState: ClassificaGlobaleState,
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    torneoState: torneoReducer,
    utenteState: utenteReducer,
    iscrizioneState: iscrizioneReducer,
    classificaState: classificaReducer,
    classificaGlobaleState: classificaGlobaleReducer

}