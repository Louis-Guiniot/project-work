import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Classifica } from 'src/app/core/model/Classifica';
import { HttpCommunicationsService } from 'src/app/core/model/http/http-communications.service';
import { Torneo } from 'src/app/core/model/Torneo.interface';
import { Utente } from 'src/app/core/model/Utente.interface';
import { selectClassifica } from 'src/app/redux/classifica';
import { selectTorneo } from 'src/app/redux/miei-tornei';
import { getCurrentUtente, selectUtente } from 'src/app/redux/utente';
import { ClassificaService } from 'src/app/services/classifica/classifica.service';
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
    private classificaService: ClassificaService,
    private modalService: NgbModal, 
    private http: HttpCommunicationsService) { 

    this.utentiService.elencoUtenti()
    this.mieiTorneiService.elencoTornei()
    this.classificaService.classifica()
    

  }
  
  thLabels = [
    {label:'nome'},{label:'gioco'},{label:'piattaforma'},{label:'capienza'},
    {label:'iscrizioni'},{label:'posti_liberi'},{label:'partite'},
    {label:'quota'},{label:'stato'},
  ]

  idCreatore = Number(sessionStorage.getItem('id'))

  idTorneoDaVedere: number
  openDetailModal(content:string,idtorneo:number) {
    this.modalService.open(content, {centered: true });
    console.log("aperto modale modifica torneo con id : ", idtorneo)
    this.idTorneoDaVedere = idtorneo
  }

  ngOnInit(): void {


  }

  get mieiTornei():Observable<Torneo[]>{
    return this.store.pipe(select(selectTorneo))
  }

  get utenti():Observable<Utente[]>{
    return this.store.pipe(select(selectUtente))
  }

  get classifica():Observable<Classifica[]>{
    return this.store.pipe(select(selectClassifica))
  }

  iscriviti(){
    this.iscrizioniService.iscriviUtente(this.idTorneoDaVedere, this.idCreatore)
  }

}
