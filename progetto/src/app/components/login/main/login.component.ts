import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private store: Store, private router: Router,private loginService: LoginService) { 

  }

  creaNuovoUtenteForm:FormGroup
  loginUtenteForm:FormGroup

  inputFormLogin = [
    {formControlName:'username',placeholder:'username',type:'text'},
    {formControlName:'password',placeholder:'password',type:'password'}
  ]

  inputFormRegistrazione = [
    {formControlName:'nome',placeholder:'nome',type:'text'},{formControlName:'cognome',placeholder:'cognome',type:'text'},
    {formControlName:'username',placeholder:'username',type:'text'},{formControlName:'password',placeholder:'password',type:'password'},
    {formControlName:'email',placeholder:'email',type:'text'},{formControlName:'datanascita',placeholder:'data di nascita gg-mm-aaaa',type:'text'},
  ]

  radioFormRegistrazione = [
    {label:'maschio'},{label:'femmina'},{label:'altro'}
  ]


  active = 1

  ngOnInit(): void {

    this.creaNuovoUtenteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      genere: ['', Validators.required],
      datanascita: ['', Validators.required],
    })

    this.loginUtenteForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  registrati(){

    this.loginService.nuovoUtente(
      this.creaNuovoUtenteForm.value.nome,
      this.creaNuovoUtenteForm.value.cognome,
      this.creaNuovoUtenteForm.value.username,
      this.creaNuovoUtenteForm.value.password,
      this.creaNuovoUtenteForm.value.email,
      this.creaNuovoUtenteForm.value.genere,
      this.creaNuovoUtenteForm.value.datanascita
    )
  }

  login(){
    this.loginService.loginUtente(this.loginUtenteForm.value.username,this.loginUtenteForm.value.password)
  }

}
