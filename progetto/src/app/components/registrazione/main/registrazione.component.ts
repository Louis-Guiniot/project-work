import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  constructor(private fb:FormBuilder,private store: Store, private router: Router,private loginService: LoginService) { 

  }
  
  creaNuovoUtenteForm:FormGroup

  sessoSelect = [
    {label:'maschio'},{label:'femmina'},{label:'altro'}
  ]

  giorniSelect = []
  anniSelect = []
  mesiSelect = []

  datanascita:string

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

    this.creaNuovoUtenteForm = this.fb.group({
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

  

  registrati(){
    this.datanascita = this.creaNuovoUtenteForm.value.mese + "-" + this.creaNuovoUtenteForm.value.giorno + "-" + this.creaNuovoUtenteForm.value.anno
    console.log(this.datanascita)
    this.loginService.nuovoUtente(
      this.creaNuovoUtenteForm.value.nome,
      this.creaNuovoUtenteForm.value.cognome,
      this.creaNuovoUtenteForm.value.username,
      this.creaNuovoUtenteForm.value.password,
      this.creaNuovoUtenteForm.value.email,
      this.creaNuovoUtenteForm.value.genere,
      this.datanascita
    )
  }
}
