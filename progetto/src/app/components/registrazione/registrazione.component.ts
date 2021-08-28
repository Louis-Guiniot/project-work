import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {

  }

  creaNuovoUtenteForm: FormGroup
  erroreCreazione = false;
  errorePsw = false;

  ngOnInit(): void {

    this.creaNuovoUtenteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  erroreSign: string

  registrati() {
    if (this.creaNuovoUtenteForm.value.password.lenght > 8) {
      this.loginService.registraUtente(this.creaNuovoUtenteForm.value).subscribe(res => {
        if (res.result == null) {
          this.erroreCreazione = true;
        } else {
          this.loginService.loginUtente(this.creaNuovoUtenteForm.value.username, this.creaNuovoUtenteForm.value.password).subscribe(res => {
            if (res.result != null) {
              sessionStorage.setItem("utente", JSON.stringify(res.result))
              this.router.navigate(['/home']);
            }
          })
        }
      })
    } else {
      this.errorePsw = true;
    }


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
    this.errorePsw = false;
  }
}
