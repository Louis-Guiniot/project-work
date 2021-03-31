import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Utente } from 'src/app/core/model/Utente.interface';
import { selectUtente } from 'src/app/redux/utente';
import { UtenteService } from 'src/app/services/utente/utente.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {

  constructor(private store: Store, private router: Router, private fb: FormBuilder, private utenteService: UtenteService) { 
    console.log(this.utenteService.elencoUtenti())
  }

  idutente = Number(sessionStorage.getItem('id'))

  editaUtenteForm: FormGroup

  sessoSelect = [
    {label:'maschio'},{label:'femmina'},{label:'altro'}
  ]

  giorniSelect = []
  anniSelect = []
  mesiSelect = []


  ngOnInit(): void {

    this.mesiSelect = [
      {label:'Gennaio',value:'01'},
      {label:'Febbraio',value:'02'}, 
      {label:'Marzo',value:'03'},
      {label:'Aprile',value:'04'},
      {label:'Maggio',value:'05'}, 
      {label:'Giugno',value:'06'},
      {label:'Luglio',value:'07'},
      {label:'Agosto',value:'08'},
      {label:'Settembre',value:'09'},
      {label:'Ottombre',value:'10'},
      {label:'Novembre',value:'11'},
      {label:'Dicembre',value:'12'}
    ]

    for(let i = 1; i<=31; i++){
      this.giorniSelect.push({label:i})
    }

    for(let i = 1970; i<=2021; i++){
      this.anniSelect.push({label:i})
    }

    console.log("utente: ",this.idutente)

    this.editaUtenteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      genere: ['', Validators.required],
      mese: ['', Validators.required],
      giorno: ['', Validators.required],
      anno: ['', Validators.required],

    })

  }

  get utenti():Observable<Utente[]>{
    return this.store.pipe(select(selectUtente))
  }

  datanascita = ""

  edita(){
    this.utenteService.aggiornaUtente(
      this.idutente,
      this.editaUtenteForm.value.nome,
      this.editaUtenteForm.value.cognome,
      this.editaUtenteForm.value.username,
      this.editaUtenteForm.value.email,
      this.editaUtenteForm.value.password,
      this.datanascita
    )

    window.location.reload()
  }

}
