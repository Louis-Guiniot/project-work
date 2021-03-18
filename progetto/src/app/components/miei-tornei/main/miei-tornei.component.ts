import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTorneo } from 'src/app/redux/miei-tornei';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';
import { Torneo } from 'src/app/core/model/Torneo.interface';

@Component({
  selector: 'app-miei-tornei',
  templateUrl: './miei-tornei.component.html',
  styleUrls: ['./miei-tornei.component.scss']
})
export class MieiTorneiComponent implements OnInit {

  constructor(private fb:FormBuilder,private store: Store, private router: Router,private mieiTorneiService: MieiTorneiService) { 
    console.log(this.mieiTorneiService.elencoTornei());
  }

  creaNuovoTorneoForm:FormGroup

  thLabels = [
    {label:'nome'},{label:'gioco'},{label:'piattaforma'},{label:'capienza'},
    {label:'capienza_min'},{label:'iscrizioni'},{label:'posti_liberi'},{label:'partite'},
    {label:'quota'},{label:'premio_1^'},{label:'premio_2^'},{label:'premio_3^'},{label:'id_creatore'},{label:'stato'},
  ]

  inputForm = [
    {formControlName:'nome',placeholder:'nome'},{formControlName:'gioco',placeholder:'gioco'},
    {formControlName:'piattaforma',placeholder:'piattaforma'},{formControlName:'capienza',placeholder:'capienza'},
    {formControlName:'capienzaMinima',placeholder:'capienza minima'},{formControlName:'iscrizioni',placeholder:'iscrizioni'},
    {formControlName:'postiLiberi',placeholder:'posti liberi'},{formControlName:'partite',placeholder:'partite'},
    {formControlName:'quota',placeholder:'quota'},{formControlName:'premioPrimo',placeholder:'premio 1^'},
    {formControlName:'premioSecondo',placeholder:'premio 2^'},{formControlName:'premioTerzo',placeholder:'premio 3^'},
    {formControlName:'idCreatore',placeholder:'id creatore'},{formControlName:'stato',placeholder:'stato'},
  ]

  ngOnInit(): void {

    this.creaNuovoTorneoForm = this.fb.group({
      nome: ['', Validators.required],
      gioco: ['', Validators.required],
      piattaforma: ['', Validators.required],
      capienza: ['', Validators.required],
      capienzaMinima: ['', Validators.required],
      iscrizioni: ['', Validators.required],
      postiLiberi: ['', Validators.required],
      partite: ['', Validators.required],
      quota: ['', Validators.required],
      premioPrimo: ['', Validators.required],
      premioSecondo: ['', Validators.required],
      premioTerzo: ['', Validators.required],
      idCreatore: ['', Validators.required],
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
      this.creaNuovoTorneoForm.value.iscrizioni,
      this.creaNuovoTorneoForm.value.postiLiberi,
      this.creaNuovoTorneoForm.value.partite,
      this.creaNuovoTorneoForm.value.quota,
      this.creaNuovoTorneoForm.value.premioPrimo,
      this.creaNuovoTorneoForm.value.premioSecondo,
      this.creaNuovoTorneoForm.value.premioTerzo,
      this.creaNuovoTorneoForm.value.idCreatore,
      this.creaNuovoTorneoForm.value.stato
    )
  }

}
