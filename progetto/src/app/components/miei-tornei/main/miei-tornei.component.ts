import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTorneo } from 'src/app/redux/miei-tornei';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';
import { Torneo } from 'src/app/core/model/Torneo.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-miei-tornei',
  templateUrl: './miei-tornei.component.html',
  styleUrls: ['./miei-tornei.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MieiTorneiComponent implements OnInit {

  constructor(private fb:FormBuilder,private store: Store, private router: Router,private mieiTorneiService: MieiTorneiService,private modalService: NgbModal) { 
    // console.log(this.mieiTorneiService.elencoTorneiPerCreatore(sessionStorage.getItem('id')));
    console.log(this.mieiTorneiService.elencoTornei());
  }

  thLabels = [
    {label:'nome'},{label:'gioco'},{label:'piattaforma'},{label:'capienza'},
    {label:'capienza_min'},{label:'iscrizioni'},{label:'posti_liberi'},{label:'partite'},
    {label:'quota'},{label:'premio_1^'},{label:'premio_2^'},{label:'premio_3^'},{label:'id_creatore'},{label:'stato'},
  ]

  inputForm = [
    {formControlName:'nome',placeholder:'nome'},{formControlName:'gioco',placeholder:'gioco'},
    {formControlName:'piattaforma',placeholder:'piattaforma'},{formControlName:'capienza',placeholder:'capienza'},
    {formControlName:'capienzaMinima',placeholder:'capienza minima'},{formControlName:'partite',placeholder:'partite'},
    {formControlName:'quota',placeholder:'quota'},{formControlName:'premioPrimo',placeholder:'premio 1^'},
    {formControlName:'premioSecondo',placeholder:'premio 2^'},{formControlName:'premioTerzo',placeholder:'premio 3^'},
    {formControlName:'stato',placeholder:'stato'},
  ]

  editForm = [
    {formControlName:'nome',placeholder:'torneo.nome'},{formControlName:'gioco',placeholder:'torneo.gioco'},
    {formControlName:'piattaforma',placeholder:'torneo.piattaforma'},{formControlName:'capienza',placeholder:'torneo.capienza'},
    {formControlName:'capienzaMinima',placeholder:'torneo.capienzaMinima'},{formControlName:'partite',placeholder:'torneo.partite'},
    {formControlName:'quota',placeholder:'torneo.quota'},{formControlName:'premioPrimo',placeholder:'torneo.premioPrimo'},
    {formControlName:'premioSecondo',placeholder:'torneo.premioSecondo'},{formControlName:'premioTerzo',placeholder:'torneo.premioTerzo'},
    {formControlName:'stato',placeholder:'torneo.stato'},
  ]



  closeResult: string
  openInsertModal(content:string) {
    this.modalService.open(content, { size: 'xl' });
    console.log("aperto modale creazione torneo")
  }

  idTorneoDaEditare: number
  openEditModal(content:string,idtorneo:number) {
    this.modalService.open(content, { size: 'xl' });
    console.log("aperto modale modifica torneo con id : ", idtorneo)
    this.idTorneoDaEditare = idtorneo
  }

  idTorneoDaEliminare:number
  nomeTorneoDaEliminare: string
  openDeleteModal(content:string,idtorneo:number,nometorneo:string) {
    this.modalService.open(content, { size: 'xl' });
    console.log("aperto modale eliminazione torneo con id : " , idtorneo)
    this.idTorneoDaEliminare = idtorneo
    this.nomeTorneoDaEliminare = nometorneo
  }


  creaNuovoTorneoForm: FormGroup
  editaTorneoForm: FormGroup

  idCreatore = Number(sessionStorage.getItem('id'))

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
      stato: ['', Validators.required],
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
      stato: ['', Validators.required],
    })

  }

  get mieiTornei():Observable<Torneo[]>{
    return this.store.pipe(select(selectTorneo))
  }

  crea(){

    console.log(this.creaNuovoTorneoForm)

    this.mieiTorneiService.nuovoTorneo(
      this.creaNuovoTorneoForm.value.nome,
      this.creaNuovoTorneoForm.value.gioco,
      this.creaNuovoTorneoForm.value.piattaforma,
      this.creaNuovoTorneoForm.value.capienza,
      this.creaNuovoTorneoForm.value.capienzaMinima,
      this.creaNuovoTorneoForm.value.partite,
      this.creaNuovoTorneoForm.value.quota,
      this.creaNuovoTorneoForm.value.premioPrimo,
      this.creaNuovoTorneoForm.value.premioSecondo,
      this.creaNuovoTorneoForm.value.premioTerzo,
      this.idCreatore,
      this.creaNuovoTorneoForm.value.stato
    )

    window.location.reload()

  }

  edita(){
    this.mieiTorneiService.aggiornaTorneo(
      this.idTorneoDaEditare,
      this.editaTorneoForm.value.nome,
      this.editaTorneoForm.value.gioco,
      this.editaTorneoForm.value.piattaforma,
      this.editaTorneoForm.value.capienza,
      this.editaTorneoForm.value.capienzaMinima,
      this.editaTorneoForm.value.partite,
      this.editaTorneoForm.value.quota,
      this.editaTorneoForm.value.premioPrimo,
      this.editaTorneoForm.value.premioSecondo,
      this.editaTorneoForm.value.premioTerzo,
      this.editaTorneoForm.value.stato
    )

    window.location.reload()
    
  }

  elimina(){
    console.log(this.idTorneoDaEliminare)
    this.mieiTorneiService.eliminaTorneo(this.idTorneoDaEliminare)

    window.location.reload()
  }

}
