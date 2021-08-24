import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login/login.service';
import { UtenteService } from 'src/app/services/utente/utente.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {


  get currentUser(): any {
    return JSON.parse(sessionStorage.getItem("utente"));
  }

  toggled = true;
  passwordType = 'password'

  segnalaOk = false;

  emailFormControl = new FormControl(this.currentUser.email, [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl(this.currentUser.password, [
    Validators.required
  ]);
  nomeFormControl = new FormControl(this.currentUser.nome, [
    Validators.required
  ]);
  cognomeFormControl = new FormControl(this.currentUser.cognome, [
    Validators.required
  ]);
  usernameFormControl = new FormControl(this.currentUser.username, [
    Validators.required
  ]);
  coloreAvatarFormControl = new FormControl(this.currentUser.coloreavatar !== null ? this.currentUser.coloreavatar : 'blu', [
    Validators.required
  ]);

  constructor(private store: Store, private router: Router, private fb: FormBuilder, private utenteService: UtenteService, private loginService: LoginService) {

    this.mesiSelect = [
      { label: 'Gennaio', value: '01' },
      { label: 'Febbraio', value: '02' },
      { label: 'Marzo', value: '03' },
      { label: 'Aprile', value: '04' },
      { label: 'Maggio', value: '05' },
      { label: 'Giugno', value: '06' },
      { label: 'Luglio', value: '07' },
      { label: 'Agosto', value: '08' },
      { label: 'Settembre', value: '09' },
      { label: 'Ottombre', value: '10' },
      { label: 'Novembre', value: '11' },
      { label: 'Dicembre', value: '12' }
    ]

    for (let i = 1; i <= 31; i++) {
      this.giorniSelect.push({ label: i })
    }

    for (let i = 1970; i <= 2021; i++) {
      this.anniSelect.push({ label: i })
    }

    this.editaUtenteForm = this.fb.group({
      id: this.currentUser.id,
      nome: this.nomeFormControl,
      cognome: this.cognomeFormControl,
      username: this.usernameFormControl,
      password: this.passwordFormControl,
      email: this.emailFormControl,
      genere: [''],
      mese: [''],
      giorno: [''],
      anno: [''],
      coloreavatar: this.coloreAvatarFormControl
    })
  }

  editaUtenteForm: FormGroup

  elUtenti = [];

  sessoSelect = [
    { label: 'maschio' }, { label: 'femmina' }, { label: 'altro' }
  ]

  giorniSelect = []
  anniSelect = []
  mesiSelect = []


  ngOnInit(): void {

  }


  edita() {
    this.loginService.updateUtente(this.editaUtenteForm.value).subscribe(res => {
      if (res != null) {
        sessionStorage.setItem("utente", JSON.stringify(res.result))
        this.segnalaOk = true;
        setTimeout(() => this.segnalaOk = false, 2500); // hide the alert after 2.5s
      }
    })
  }


  togglePassword() {
    if (this.toggled) {
      this.toggled = false
      this.passwordType = 'text'
    }
    else {
      this.toggled = true
      this.passwordType = 'password'
    }
  }

  resetForm() {
    this.editaUtenteForm.reset();
  }
}
