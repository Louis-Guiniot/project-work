export interface Torneo {
    id?: number
    nome: string
    gioco: string
    piattaforma: string
    capienza: number
    capienzaMinima: number
    iscrizioni: number
    postiLiberi: number
    partite: number
    quota: number
    premioPrimo: string
    premioSecondo: string
    premioTerzo: string
    idCreatore: number
    stato: string
}