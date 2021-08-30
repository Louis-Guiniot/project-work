import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Torneo } from 'src/app/core/model/Torneo.interface';
import { ClassificaService } from 'src/app/services/classifica/classifica.service';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';
import { UtenteService } from 'src/app/services/utente/utente.service';
import { Utente } from './../../core/model/Utente.interface';

function sortById(a, b) {
  if (a.idIscrizione > b.idIscrizione) {
    return -1;
  }
  if (a.idIscrizione < b.idIscrizione) {
    return 1;
  }
  return 0;
}

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.scss']
})
export class ClassificaComponent implements OnInit {

  get currentUser(): any {
    return JSON.parse(sessionStorage.getItem("utente"));
  }

  idIscrizione: any;
  idTorneo: any;

  torneo: Torneo;
  nomeTorneo: any;

  classifica = [];
  recordUtente: Utente;

  storico: any;


  primo: any;
  secondo: any;
  terzo: any;

  constructor(
    private classificaService: ClassificaService,
    private utenteService: UtenteService,
    private torneoService: MieiTorneiService,
    private router: Router,
    private route: ActivatedRoute) {
    this.idIscrizione = Number(this.route.snapshot.paramMap.get('idIscrizione')); //get id parameter
    this.idTorneo = Number(this.route.snapshot.paramMap.get('idTorneo')); //get id parameter

    this.getClassificaTorneo();
    this.getTorneo();
    this.getStorico();

  }

  ngOnInit(): void {

  }

  getClassificaTorneo() {
    this.classificaService.getClassifica(this.idIscrizione).subscribe(result => {
      if (result.result != null) {

        let classificaTemp = [];
        classificaTemp = result.result
        this.classifica = classificaTemp;

        let count = 0
        classificaTemp.forEach(player => {
          if (player.amI) {
            this.recordUtente = player;
          }
          count++;
        })

        this.primo = classificaTemp[0];
        this.secondo = classificaTemp[1];
        this.terzo = classificaTemp[2];
      }
    })
  }

  getTorneo() {
    this.torneoService.getTorneo(this.idTorneo).subscribe(result => {
      if (result.result != null) {
        this.torneo = result.result;
        this.nomeTorneo = this.torneo.nome;
      }
    })
  }

  getStorico() {
    this.classificaService.getStorico(this.currentUser.id).subscribe(result => {
      if (result.result != null) {
        this.storico = result.result;
        this.storico.sort(sortById);
        this.storico = this.storico.slice(0, 5);
        console.log(this.storico)
      }
    })
  }
}
