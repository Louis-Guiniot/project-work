import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Torneo } from 'src/app/core/model/Torneo.interface';
import { selectTorneo } from 'src/app/redux/miei-tornei';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrls: ['./tornei.component.scss']
})
export class TorneiComponent implements OnInit {

  constructor(private fb:FormBuilder,private store: Store, private router: Router,private mieiTorneiService: MieiTorneiService,private modalService: NgbModal) { 
    // console.log(this.mieiTorneiService.elencoTorneiPerCreatore(sessionStorage.getItem('id')));
    console.log(this.mieiTorneiService.elencoTornei());
  }
  
  thLabels = [
    {label:'nome'},{label:'gioco'},{label:'piattaforma'},{label:'capienza'},
    {label:'iscrizioni'},{label:'posti_liberi'},{label:'partite'},
    {label:'quota'},{label:'stato'},
  ]

  idCreatore = Number(sessionStorage.getItem('id'))

  idTorneoDaVedere: number
  openDetailModal(content:string,idtorneo:number) {
    this.modalService.open(content, { size: 'xl' });
    console.log("aperto modale modifica torneo con id : ", idtorneo)
    this.idTorneoDaVedere = idtorneo
  }

  ngOnInit(): void {
  }

  get mieiTornei():Observable<Torneo[]>{
    return this.store.pipe(select(selectTorneo))
  }

}
