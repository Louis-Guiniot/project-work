import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { HttpCommunicationsService } from 'src/app/core/model/http/http-communications.service';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';

@Component({
  selector: 'app-miei-tornei',
  templateUrl: './miei-tornei.component.html',
  styleUrls: ['./miei-tornei.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MieiTorneiComponent implements OnInit {

  get currentUser(): any {
    return JSON.parse(sessionStorage.getItem("utente"));
  }

  get torneiTot(): number {
    return this.countPronti + this.countTerminati + this.countTornei;
  }

  constructor(private fb: FormBuilder, private store: Store, private router: Router, private mieiTorneiService: MieiTorneiService, private modalService: NgbModal, private http: HttpCommunicationsService) {
    this.getTornei();
  }

  imgSrc = "../../../../assets/images/kraken-2.png";
  countTornei = 0;
  countTerminati = 0;
  countPronti = 0;

  creaNuovoTorneoForm: FormGroup
  editaTorneoForm: FormGroup

  arrayTornei = [];
  filtri = [];

  ngOnInit(): void {


    this.creaNuovoTorneoForm = this.fb.group({
      nome: ['', Validators.required],
      gioco: ['', Validators.required],
      piattaforma: ['', Validators.required],
      capienza: ['', Validators.required],
      capienzaMinima: ['', Validators.required],
      partite: ['', Validators.required],
      quota: ['', Validators.required],
      premioPrimo: ['', Validators.required],
      premioSecondo: ['', Validators.required],
      premioTerzo: ['', Validators.required],
      descrizione: ['', Validators.required],
    })

    this.editaTorneoForm = this.fb.group({
      nome: ['', Validators.required],
      gioco: ['', Validators.required],
      piattaforma: ['', Validators.required],
      capienza: ['', Validators.required],
      capienzaMinima: ['', Validators.required],
      partite: ['', Validators.required],
      quota: ['', Validators.required],
      premioPrimo: ['', Validators.required],
      premioSecondo: ['', Validators.required],
      premioTerzo: ['', Validators.required],
      descrizione: ['', Validators.required],
    })

  }

  crea() {

  }

  edita() {

  }

  elimina() {


  }

  getTornei() {
    this.mieiTorneiService.getMieiTornei(this.currentUser.id).subscribe(tornei => {
      this.arrayTornei = tornei.result;
      this.arrayTornei.forEach(torneo => {
        if (torneo.stato === "CONCLUSO") {
          this.countTerminati++;
        } else if (torneo.stato === "IN CORSO") {
          this.countTornei++;
        } else if (torneo.stato === "PRONTO") {
          this.countPronti++;
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

  getTorneiAll() {
    this.mieiTorneiService.getMieiTornei(this.currentUser.id).subscribe(tornei => {
      this.arrayTornei = tornei.result;

      this.filtri.forEach(filtro => {
        if (filtro.desc === "TUTTI") {
          filtro.attivo = 1;
        }
      })
    });
  }

  caricaFiltri() {

    if (this.countPronti > 0) {
      this.filtri.push({ id: 1, desc: 'ONLINE', lbl: 'PRONTI' });
    }

    if (this.countTornei > 0) {
      this.filtri.push({ id: 2, desc: 'INCORSO', lbl: 'IN CORSO' });
    }

    if (this.countTerminati > 0) {
      this.filtri.push({ id: 3, desc: 'CONCLUSO', lbl: 'CONCLUSI' });
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
      this.mieiTorneiService.getMieiTorneiFiltrati(filtroIn.desc, this.currentUser.id).subscribe(tornei => {
        this.arrayTornei = tornei.result;
      });
    } else {
      this.getTorneiAll();
    }
  }

}
