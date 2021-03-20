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

  ngOnInit(): void {

    console.log("utente: ",this.idutente)

    this.editaUtenteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      genere: ['', Validators.required],
      datanascita: ['', Validators.required],
      
    })

  }

  get utenti():Observable<Utente[]>{
    return this.store.pipe(select(selectUtente))
  }

  edita(){
    this.utenteService.aggiornaUtente(
      this.idutente,
      this.editaUtenteForm.value.nome,
      this.editaUtenteForm.value.cognome,
      this.editaUtenteForm.value.username,
      this.editaUtenteForm.value.email,
      this.editaUtenteForm.value.password,
      this.editaUtenteForm.value.datanascita

    )

    window.location.reload()
  }

}
