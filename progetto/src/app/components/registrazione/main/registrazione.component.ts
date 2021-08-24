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

  constructor(private fb: FormBuilder, private store: Store, private router: Router, private loginService: LoginService) {

  }

  creaNuovoUtenteForm: FormGroup
  erroreCreazione = false;
  erroreMsg = '';

  ngOnInit(): void {

    this.creaNuovoUtenteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  erroreSign: string

  registrati() {
    this.loginService.registraUtente(this.creaNuovoUtenteForm.value).subscribe(res => {
      if (res.result == null) {
        this.erroreCreazione = true;
        this.erroreMsg = res.errore
      } else {
        this.loginService.loginUtente(this.creaNuovoUtenteForm.value.username, this.creaNuovoUtenteForm.value.password).subscribe(res => {
          if (res.result != null) {
            sessionStorage.setItem("utente", JSON.stringify(res.result))
            this.router.navigate(['/home']);
          }
        })
      }
    })

  }

  toggled = true
  passwordType = 'password'

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
    this.creaNuovoUtenteForm.reset()
    sessionStorage.removeItem('errorSignUp')
  }
}
