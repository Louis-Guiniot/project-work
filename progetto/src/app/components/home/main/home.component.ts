import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClassificaGlobale } from 'src/app/core/model/ClassificaGlobale';
import { Utente } from 'src/app/core/model/Utente.interface';
import { selectClassificaGlobale } from 'src/app/redux/classificaGlobale';
import { selectUtente } from 'src/app/redux/utente';
import { ClassificaGlobaleService } from 'src/app/services/classificaGlobale/classifica-globale.service';
import { UtenteService } from 'src/app/services/utente/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private classificaGlobaleService: ClassificaGlobaleService, 
    private utenteService: UtenteService,
    private store: Store, 
    private modalService: NgbModal) { 

    this.classificaGlobaleService.classificaGlobale()
    this.utenteService.elencoUtenti();

  }

  sesso = sessionStorage.getItem('sesso')

  idPlayerPassato : number
  usernameUtentePassato : string
  openPlayerDetailModal(content:string, idPlayer:number, utenteUsername: string){
    this.modalService.open(content, {centered: true})
    this.idPlayerPassato = idPlayer
    this.usernameUtentePassato = utenteUsername

    console.log("aperto modale dettaglio globale player : "+ this.idPlayerPassato, this.usernameUtentePassato)
  }

  ngOnInit(): void {
  }

  get classificaGlobale():Observable<ClassificaGlobale[]> {
    return this.store.pipe(select(selectClassificaGlobale))
  }

  get utenti():Observable<Utente[]>{
    return this.store.pipe(select(selectUtente))
  }


}
