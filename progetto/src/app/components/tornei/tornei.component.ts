import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { IscrizioneComponent } from 'src/app/contents/iscrizione/iscrizione.component';
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
export class TorneiComponent implements OnInit, AfterViewInit {

  @ViewChild('input', { static: false }) search: ElementRef; //prendo il valore di input da html
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;

  arrayTornei = [];
  countTornei = 0;
  countPronto = 0;
  countCorso = 0;

  filtri = [];

  sortedData = [];

  mostraGrid = true;
  mostraList = false;
  ricerca = false;

  bsModalRef: BsModalRef;

  searchForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private mieiTorneiService: MieiTorneiService,
    private iscrizioniService: IscrizioniService,
    private utentiService: UtenteService,
    private classificaGlobaleService: ClassificaGlobaleService,
    private classificaService: ClassificaService,
    private http: HttpCommunicationsService) {

    this.searchForm = this.fb.group({
      termine: ['']
    })

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
  // openDetailModal(content: string, idtorneo: number, nometorneo: string) {
  //   this.modalService.open(content, { centered: true, size: 'xl' });
  //   console.log("aperto modale modifica torneo con id : ", idtorneo)
  //   this.idTorneoDaVedere = idtorneo
  //   this.nomeTorneoDaVedere = nometorneo
  // }

  // idTorneoDaIscrivere: number
  // openIscrivitiModal(content: string, idTorneoIscrizione: number) {
  //   this.modalService.open(content, { centered: true, size: 'xl' });
  //   console.log("aperto modale iscrizione con id : ", this.idTorneoDaIscrivere, "id utente" + this.idCreatore)
  //   this.idTorneoDaIscrivere = idTorneoIscrizione
  // }

  // idPlayerPassato: number
  // usernameUtentePassato: string
  // openPlayerDetailModal(content: string, idPlayer: number, utenteUsername: string) {
  //   this.modalService.open(content, { centered: true })
  //   this.idPlayerPassato = idPlayer
  //   this.usernameUtentePassato = utenteUsername

  //   console.log("aperto modale dettaglio globale player : " + this.idPlayerPassato, this.usernameUtentePassato)
  // }

  torneiOnline = 0
  conta = 0

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    let evento;
    setTimeout(() => {
      fromEvent(this.search.nativeElement, 'keyup')
        .pipe(
          filter(Boolean),
          debounceTime(100),
          distinctUntilChanged(),
          tap((event: KeyboardEvent) => {

            evento = this.search.nativeElement.value
            this.ricerca = true;
            console.log(evento)
          })
        )
        .subscribe(value => {
          this.filtraTabella(evento) //chiamo la funzione filtra passandogli il termine cercato
        });
    }, 1000);
  }




  getTorneiOnline() {
    this.mieiTorneiService.getTorneiOnline().subscribe(res => {
      if (res.result != null) {
        let tornei = res;
        this.arrayTornei = tornei.result;
        this.countTornei = this.arrayTornei.length;
        this.sortedData = this.arrayTornei.slice();
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
      this.sortedData = this.arrayTornei.slice();
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
        this.sortedData = this.arrayTornei.slice();
      });
    } else {
      this.getTorneiOnlineAll();
    }
  }

  filtraTabella(evento) {

    let termine: string;
    termine = String(evento.toLowerCase());
    console.log(termine)
    if (termine !== '') {
      let arrayAppoggio = [];
      this.sortedData.forEach(torneo => {
        if (
          (torneo.nome.toLowerCase()).includes(termine) ||
          (torneo.gioco.toLowerCase()).includes(termine) ||
          (torneo.piattaforma.toLowerCase()).includes(termine)
        ) {
          arrayAppoggio.push(torneo)
        }
      })
      if (arrayAppoggio.length > 0) {
        this.sortedData = arrayAppoggio.slice();
      }
    } else {
      this.ricerca = false;
      this.sortedData = this.arrayTornei.slice();
    }
  }

  resetSearch() {
    this.ricerca = false;
    this.sortedData = this.arrayTornei;
    this.searchForm.reset();
  }



  iscritto = false

  classifica = '/classifica'
  isCompleto
  // iscriviti() {
  //   console.log('id  ' + this.idTorneoDaIscrivere)
  //   console.log('idUtente    ' + this.idCreatore)
  //   this.iscritto = true
  //   this.iscrizioniService.iscriviUtente(this.idTorneoDaIscrivere, this.idCreatore)
  //   this.isCompleto = (sessionStorage.getItem('torneoCompleto'))
  //   console.log("is completo ", this.isCompleto)
  //   if (this.isCompleto == 'true') {
  //     console.log("completo")
  //     window.location.reload()
  //   }
  // }

  openIscrizione() {

  }

  simulato = false

  // simula() {

  //   this.simulato = true
  //   console.log('id  ' + this.idTorneoDaIscrivere)
  //   console.log('idUtente    ' + this.idCreatore)
  //   this.classificaService.simulazione(this.idTorneoDaIscrivere, this.idCreatore)

  // }

  goToClassifica() {
    this.router.navigateByUrl("/classifica")
    sessionStorage.setItem('generata', 'false')
  }

  sortData(sort: Sort) {
    const data = this.arrayTornei.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'gioco': return compare(a.gioco, b.gioco, isAsc);
        case 'piattaforma': return compare(a.piattaforma, b.piattaforma, isAsc);

        default: return 0;
      }
    });
  }


  mostraOpzioni() {
    if (this.mostraGrid) {
      this.mostraGrid = false;
      this.mostraList = true;
    } else {
      this.mostraList = false;
      this.mostraGrid = true;
    }
  }

  closeResult = '';
  openModal(torneo) {
    let modalRef;
    modalRef = this.modalService.open(IscrizioneComponent);
    modalRef.componentInstance.torneo = torneo;
    modalRef.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal() {
    this.modal.hide();
  }

  handler(type: string, $event: ModalDirective) {
    if ($event.dismissReason) {

    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

