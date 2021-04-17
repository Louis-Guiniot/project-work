import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { windowWhen } from 'rxjs/operators';
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

    this.loginUtenteForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  erroreLogin: string
  count = 0

  login(){
    this.loginService.loginUtente(this.loginUtenteForm.value.username,this.loginUtenteForm.value.password)

    this.erroreLogin = sessionStorage.getItem('error')
    console.log('errore ?',this.erroreLogin)

    if(sessionStorage.getItem('error')){
      this.count ++
    }

    console.log("conta", this.count)

    if(this.count == 5){
      window.alert("login sbagliata troppe volte, per motivi di sicurezza la pagina verrà ricaricata")
      this.count = 0

      sessionStorage.removeItem('error')
      window.location.reload()
    }


  }

  toggled = true
  passwordType = 'password'

  togglePassword(){
    if(this.toggled){
      this.toggled = false
      this.passwordType = 'text'
    }
    else{
      this.toggled = true
      this.passwordType = 'password'
    }
  }

  resetForm(){

    this.erroreLogin = null
    this.loginUtenteForm.reset()
  }

}
