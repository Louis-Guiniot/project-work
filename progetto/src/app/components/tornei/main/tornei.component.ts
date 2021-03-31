import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpCommunicationsService } from 'src/app/core/model/http/http-communications.service';
import { Torneo } from 'src/app/core/model/Torneo.interface';
import { Utente } from 'src/app/core/model/Utente.interface';
import { selectTorneo } from 'src/app/redux/miei-tornei';
import { getCurrentUtente, selectUtente } from 'src/app/redux/utente';
import { IscrizioniService } from 'src/app/services/iscrizioni/iscrizioni.service';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';
import { UtenteService } from 'src/app/services/utente/utente.service';

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrls: ['./tornei.component.scss']
})
export class TorneiComponent implements OnInit {

  constructor(private fb:FormBuilder,private store: Store, private router: Router,
    private mieiTorneiService: MieiTorneiService,private iscrizioniService: IscrizioniService,private utentiService: UtenteService,
    private modalService: NgbModal, private http: HttpCommunicationsService) { 
    // console.log(this.mieiTorneiService.elencoTorneiPerCreatore(sessionStorage.getItem('id')));
    // console.log(this.mieiTorneiService.elencoTornei());
    // console.log(this.utentiService.elencoUtenti());
    console.log(this.mieiTorneiService.elencoTorneiExcept(this.idCreatore))

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

  filtroGioco:FormGroup

  ngOnInit(): void {

      this.filtroGioco = this.fb.group({
        gioco : ['', Validators.required]
      })

  }

  get mieiTornei():Observable<Torneo[]>{
    return this.store.pipe(select(selectTorneo))
  }

  get utenti():Observable<Utente[]>{
    return this.store.pipe(select(selectUtente))
  }

  i = 0

  // torneiFiltrati(){
  //   console.log("f = " , this.filtroGioco.value.gioco)

  //   this.store.pipe(select(selectTorneo)).subscribe((tornei) => {
  //     tornei.forEach(torneo => {
  //       if(torneo.gioco === this.filtroGioco.value.gioco){
  //         this.torneiF.push(torneo)
  //       }

  //       this.torneiF.forEach(torneoFiltrato => {
  //         if(torneoFiltrato.gioco !== this.filtroGioco.value.gioco){
  //           this.torneiF.splice(this.i,1)
  //           this.i = this.i + 1
  //         }
  //       })

  //       this.i = 0


  //     });
  //   })

  //   this.getTorneiP("ps5").subscribe(itemFound => {
  //     this.arrayDedicato = itemFound
  //     console.log("dedicat0 -- ", this.arrayDedicato)
  //   })
  // }

  iscriviti(){
    this.iscrizioniService.iscriviUtente(this.idTorneoDaVedere, this.idCreatore)
  }

  // url: string
  // arrayDedicato : Object = []

  // getTorneiP(piattaforma: string): Observable<Torneo[]> {
  //   this.url = 'torneo/elencotTorneiP'
  //   return this.http.retrievePostCall<Torneo[]>(this.url, piattaforma).pipe()
  // }

  get torneiF(): Observable<Torneo[]> {
    return this.http.retrievePostCall<Torneo[]>('torneo/elencoTorneiExcept', this.idCreatore)

  }

}
