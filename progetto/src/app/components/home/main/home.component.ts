import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ClassificaGlobaleService } from 'src/app/services/classificaGlobale/classifica-globale.service';
import { UtenteService } from './../../../services/utente/utente.service';

function sortByDate(a, b) {
  if (a.punteggioTotale > b.punteggioTotale) {
    return -1;
  }
  if (a.punteggioTotale < b.punteggioTotale) {
    return 1;
  }
  return 0;
}

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
    private modalService: NgbModal,
    private router: Router) {

    this.getUtenti();

  }

  utenti = [];

  classificaGlobale: any;
  classificaGlobaleTrovata: any;

  imgSrc = "../../../../assets/images/kraken-2.png";
  imgSrc2 = "../../../../assets/images/octopus.png";
  imgSrc3 = "../../../../assets/images/medal.png";


  getUtenti() {
    this.utenteService.elencoUtenti().subscribe(utenti => {
      let utentiTrovati: any;
      utentiTrovati = utenti;
      this.utenti = utentiTrovati.result;
      this.getElencoClassificaGlobale();
    });
  }

  getElencoClassificaGlobale() {
    this.classificaGlobaleService.elencoClassifica().subscribe(classifica => {
      let clas: any;
      clas = classifica;
      this.classificaGlobale = clas.result;

      this.classificaGlobale.forEach(element => {
        this.utenti.forEach(utente => {
          if (element.idPlayer == utente.id) {
            element.username = utente.username;
            if (utente.coloreavatar != null) {
              element.coloreAvatar = utente.coloreavatar
            } else {
              element.coloreAvatar = "blu";
            }
          }
        });
      });

      this.classificaGlobale.sort(sortByDate);

    });
  }

  goToTornei() {
    this.router.navigateByUrl('/tornei')
  }

  ngOnInit(): void {

  }


}
