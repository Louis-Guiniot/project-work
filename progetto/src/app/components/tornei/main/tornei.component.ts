import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClassificaGlobale } from 'src/app/core/model/ClassificaGlobale';
import { HttpCommunicationsService } from 'src/app/core/model/http/http-communications.service';
import { Torneo } from 'src/app/core/model/Torneo.interface';
import { Utente } from 'src/app/core/model/Utente.interface';
import { selectClassificaGlobale } from 'src/app/redux/classificaGlobale';
import { selectTorneo } from 'src/app/redux/miei-tornei';
import { selectUtente } from 'src/app/redux/utente';
import { ClassificaService } from 'src/app/services/classifica/classifica.service';
import { ClassificaGlobaleService } from 'src/app/services/classificaGlobale/classifica-globale.service';
import { IscrizioniService } from 'src/app/services/iscrizioni/iscrizioni.service';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';
import { UtenteService } from 'src/app/services/utente/utente.service';

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrls: ['./tornei.component.scss']
})
export class TorneiComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private store: Store, 
    private router: Router,
    private mieiTorneiService: MieiTorneiService,
    private iscrizioniService: IscrizioniService,
    private utentiService: UtenteService,
    private classificaGlobaleService: ClassificaGlobaleService,
    private classificaService : ClassificaService,
    private modalService: NgbModal,
    private http: HttpCommunicationsService) { 

    this.utentiService.elencoUtenti()
    this.mieiTorneiService.elencoTornei()
    this.classificaGlobaleService.classificaGlobale()

  }
  
  thLabels = [
    {label:'nome'},{label:'gioco'},{label:'piattaforma'},{label:'capienza'},
    {label:'iscrizioni'},{label:'posti_liberi'},{label:'partite'},
    {label:'quota'},{label:'stato'},
  ]

  idCreatore = Number(sessionStorage.getItem('id'))

  idTorneoDaVedere: number
  nomeTorneoDaVedere: string
  openDetailModal(content:string,idtorneo:number, nometorneo: string) {
    this.modalService.open(content, {centered: true , size: 'xl'});
    console.log("aperto modale modifica torneo con id : ", idtorneo)
    this.idTorneoDaVedere = idtorneo
    this.nomeTorneoDaVedere = nometorneo
  }

  idTorneoDaIscrivere: number
  openIscrivitiModal(content: string, idTorneoIscrizione: number){
    this.modalService.open(content, {centered: true, size: 'xl'});
    console.log("aperto modale iscrizione con id : ", this.idTorneoDaIscrivere, "id utente" + this.idCreatore)
    this.idTorneoDaIscrivere = idTorneoIscrizione
  }

  idPlayerPassato : number
  usernameUtentePassato : string
  openPlayerDetailModal(content:string, idPlayer:number, utenteUsername: string){
    this.modalService.open(content, {centered: true})
    this.idPlayerPassato = idPlayer
    this.usernameUtentePassato = utenteUsername

    console.log("aperto modale dettaglio globale player : "+ this.idPlayerPassato, this.usernameUtentePassato)
  }
  
  torneiOnline = 0
  conta = 0

  ngOnInit(): void {

    this.store.pipe(select(selectTorneo)).subscribe((tornei) => {
      tornei.forEach(torneo => {
        if(torneo.idCreatore != this.idCreatore){
          this.conta ++ 
          console.log("trovato")
        }
      })

      this.torneiOnline = this.conta
      this.conta = 0
    })

  }

  get mieiTornei():Observable<Torneo[]>{
    return this.store.pipe(select(selectTorneo))
  }

  get utenti():Observable<Utente[]>{
    return this.store.pipe(select(selectUtente))
  }

  get classificaGlobale():Observable<ClassificaGlobale[]> {
    return this.store.pipe(select(selectClassificaGlobale))
  }

  iscritto = false

  classifica = '/classifica'
  isCompleto
  iscriviti(){
    console.log('id  '+this.idTorneoDaIscrivere)
    console.log('idUtente    '+this.idCreatore)
    this.iscritto = true
    this.iscrizioniService.iscriviUtente(this.idTorneoDaIscrivere, this.idCreatore)
    this.isCompleto = Boolean(sessionStorage.getItem('torneoCompleto'))
    if(this.isCompleto){
      sessionStorage.removeItem('torneoCompleto')
      window.location.reload()
    }
  }

  simulato = false

  simula(){

    this.simulato = true
    console.log('id  '+this.idTorneoDaIscrivere)
    console.log('idUtente    '+this.idCreatore)
    this.classificaService.simulazione(this.idTorneoDaIscrivere, this.idCreatore)
  }

  goToClassifica(){
    this.router.navigateByUrl("/classifica")
  }
}
