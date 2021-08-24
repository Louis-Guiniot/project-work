import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { HttpCommunicationsService } from 'src/app/core/model/http/http-communications.service';
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


  arrayTornei = [];
  countTornei = 0;
  countPronto = 0;
  countCorso = 0;

  filtri = [];


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private mieiTorneiService: MieiTorneiService,
    private iscrizioniService: IscrizioniService,
    private utentiService: UtenteService,
    private classificaGlobaleService: ClassificaGlobaleService,
    private classificaService: ClassificaService,
    private modalService: NgbModal,
    private http: HttpCommunicationsService) {

    this.utentiService.elencoUtenti()
    this.mieiTorneiService.elencoTornei()
    this.classificaGlobaleService.classificaGlobale()
    this.getTorneiOnline();

  }

  thLabels = [
    { label: 'nome' }, { label: 'gioco' }, { label: 'piattaforma' }, { label: 'capienza' },
    { label: 'iscrizioni' }, { label: 'posti_liberi' }, { label: 'partite' },
    { label: 'quota' }, { label: 'stato' },
  ]

  idCreatore = Number(sessionStorage.getItem('id'))

  idTorneoDaVedere: number
  nomeTorneoDaVedere: string
  openDetailModal(content: string, idtorneo: number, nometorneo: string) {
    this.modalService.open(content, { centered: true, size: 'xl' });
    console.log("aperto modale modifica torneo con id : ", idtorneo)
    this.idTorneoDaVedere = idtorneo
    this.nomeTorneoDaVedere = nometorneo
  }

  idTorneoDaIscrivere: number
  openIscrivitiModal(content: string, idTorneoIscrizione: number) {
    this.modalService.open(content, { centered: true, size: 'xl' });
    console.log("aperto modale iscrizione con id : ", this.idTorneoDaIscrivere, "id utente" + this.idCreatore)
    this.idTorneoDaIscrivere = idTorneoIscrizione
  }

  idPlayerPassato: number
  usernameUtentePassato: string
  openPlayerDetailModal(content: string, idPlayer: number, utenteUsername: string) {
    this.modalService.open(content, { centered: true })
    this.idPlayerPassato = idPlayer
    this.usernameUtentePassato = utenteUsername

    console.log("aperto modale dettaglio globale player : " + this.idPlayerPassato, this.usernameUtentePassato)
  }

  torneiOnline = 0
  conta = 0

  ngOnInit(): void {

  }

  getTorneiOnline() {
    this.mieiTorneiService.getTorneiOnline().subscribe(res => {
      if (res.result != null) {
        let tornei = res;
        this.arrayTornei = tornei.result;
        this.countTornei = this.arrayTornei.length;
      }

      this.arrayTornei.forEach(torneo => {
        if (torneo.stato === "IN CORSO") {
          this.countCorso++;
        } else if (torneo.stato === "PRONTO") {
          this.countPronto++;
        }
      })

      this.caricaFiltri();
      this.filtri.forEach(filtro => {
        if (filtro.desc === "TUTTI") {
          filtro.attivo = 1;
        }
      })

    });
  }

  getTorneiOnlineAll() {
    this.mieiTorneiService.getTorneiOnline().subscribe(tornei => {
      this.arrayTornei = tornei.result;

      this.filtri.forEach(filtro => {
        if (filtro.desc === "TUTTI") {
          filtro.attivo = 1;
        }
      })
    });
  }

  caricaFiltri() {

    if (this.countPronto > 0) {
      this.filtri.push({ id: 1, desc: 'PRONTO', lbl: 'PRONTI' });
    }

    if (this.countCorso > 0) {
      this.filtri.push({ id: 2, desc: 'INCORSO', lbl: 'IN CORSO' });
    }

    this.filtri.push({ id: 4, desc: 'TUTTI', lbl: 'TUTTI' });

  }

  filtra(filtroIn) {
    filtroIn.attivo = 1;
    this.filtri.forEach(filtro => {
      if (filtroIn.id != filtro.id) {
        filtro.attivo = 0;
      }
    })

    if (filtroIn.desc !== 'TUTTI') {
      this.mieiTorneiService.getTorneiOnlineFiltrati(filtroIn.desc).subscribe(tornei => {
        this.arrayTornei = tornei.result;
      });
    } else {
      this.getTorneiOnlineAll();
    }
  }



  iscritto = false

  classifica = '/classifica'
  isCompleto
  iscriviti() {
    console.log('id  ' + this.idTorneoDaIscrivere)
    console.log('idUtente    ' + this.idCreatore)
    this.iscritto = true
    this.iscrizioniService.iscriviUtente(this.idTorneoDaIscrivere, this.idCreatore)
    this.isCompleto = (sessionStorage.getItem('torneoCompleto'))
    console.log("is completo ", this.isCompleto)
    if (this.isCompleto == 'true') {
      console.log("completo")
      window.location.reload()
    }
  }

  simulato = false

  simula() {

    this.simulato = true
    console.log('id  ' + this.idTorneoDaIscrivere)
    console.log('idUtente    ' + this.idCreatore)
    this.classificaService.simulazione(this.idTorneoDaIscrivere, this.idCreatore)

  }

  goToClassifica() {
    this.router.navigateByUrl("/classifica")
    sessionStorage.setItem('generata', 'false')
  }
}
