import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
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

  @ViewChild('input', { static: false }) search: ElementRef; //prendo il valore di input da html

  imgSrc = "../../../../assets/images/kraken-2.png";
  countTornei = 0;
  countTerminati = 0;
  countPronti = 0;

  creaNuovoTorneoForm: FormGroup
  editaTorneoForm: FormGroup

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  searchForm: FormGroup;
  ricerca = false;

  sortedData = [];
  arrayTornei = [];
  filtri = [];

  stepperOrientation: Observable<StepperOrientation>;


  constructor(
    private fb: FormBuilder,

    private router: Router,
    private mieiTorneiService: MieiTorneiService,
    private modalService: NgbModal,
    private http: HttpCommunicationsService,
    breakpointObserver: BreakpointObserver) {

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

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      thirdCtrl: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      termine: ['']
    })

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

    this.getTornei();
  }

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
        this.sortedData = this.arrayTornei.slice();
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
      this.sortedData = this.arrayTornei.slice();

      this.filtri.forEach(filtro => {
        if (filtro.desc === "TUTTI") {
          filtro.attivo = 1;
        }
      })
    });
  }

  caricaFiltri() {

    if (this.countPronti > 0) {
      this.filtri.push({ id: 1, desc: 'PRONTO', lbl: 'PRONTI' });
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
        this.sortedData = this.arrayTornei.slice();
      });
    } else {
      this.getTorneiAll();
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

}
