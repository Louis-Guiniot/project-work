import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IscrizioniService } from 'src/app/services/iscrizioni/iscrizioni.service';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';

@Component({
  selector: 'app-iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.scss']
})
export class IscrizioneComponent implements OnInit {

  get currentUser(): any {
    return JSON.parse(sessionStorage.getItem("utente"));
  }

  @Input() torneo;
  id: any;
  nome: any;

  iscritto = false;
  simulato = false;

  idIscrizione: any;

  constructor(
    private torneiService: MieiTorneiService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private iscrizioniService: IscrizioniService) {

  }

  ngOnInit() {
    this.id = this.torneo.id
  }


  iscriviti() {
    console.log('id  ' + this.id);
    console.log('user  ' + this.currentUser.id);

    this.iscrizioniService.iscriviUtente(this.id, this.currentUser.id).subscribe(result => {
      if (result.result != null) {
        this.iscritto = true
        this.idIscrizione = result.result;
        console.log(this.idIscrizione)
      }
    });
  }

  simula() {

    this.simulato = true
    console.log('id  ' + this.id);
    console.log('idUtente    ' + this.currentUser.id);

    this.iscrizioniService.simulazione(this.id, this.currentUser.id, this.idIscrizione).subscribe(result => {
      if (result.result) {
        this.iscritto = true
      }
    });

  }

  goToClassifica() {
    this.activeModal.close();
    this.router.navigate(['classifica/' + this.idIscrizione + '/' + this.id])
  }


}
