import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;

  utente: any;

  modalRef: BsModalRef;

  loginUtenteForm: FormGroup
  erroreLogin = false;


  recuperoForm: FormGroup;
  erroreRecupero = false;
  checkRecupero = false;
  nonTrovata = false;

  segnalaOK: any;


  toggled = true
  passwordType = 'password'

  constructor(
    private fb: FormBuilder,

    private router: Router,
    private loginService: LoginService,
    private modalService: BsModalService) {

  }

  ngOnInit(): void {

    this.loginUtenteForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.recuperoForm = this.fb.group({
      email: ['', Validators.required],
      password: [''],
    })

  }

  login() {
    this.loginService.loginUtente(this.loginUtenteForm.value.username, this.loginUtenteForm.value.password).subscribe(val => {
      if (val.result != null) {
        sessionStorage.setItem("utente", JSON.stringify(val.result))
        this.router.navigate(['/home'])
      } else {
        this.erroreLogin = true;
      }
    })
  }

  checkEmail() {
    this.loginService.checkEmail(this.recuperoForm.value.email).subscribe(res => {
      if (res.result != null) {
        this.checkRecupero = true;
        this.utente = res.result;
        this.recuperoForm.get('email').clearValidators();
        this.recuperoForm.get('password').setValidators(Validators.required);
        this.recuperoForm.updateValueAndValidity();
      } else {
        this.nonTrovata = true;
      }
    })
  }

  reimposta() {
    this.utente.password = this.recuperoForm.value.password;
    this.loginService.updateUtente(this.utente).subscribe(res => {
      if (res.result != null) {
        this.segnalaOK = true;
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

    this.erroreLogin = null
    this.loginUtenteForm.reset()
  }

  openModal() {
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

  handler(type: string, $event: ModalDirective) {
    if ($event.dismissReason) {
      this.recuperoForm.reset();
    }
  }
}
