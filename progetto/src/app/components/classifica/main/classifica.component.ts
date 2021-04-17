import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Classifica } from 'src/app/core/model/Classifica';
import { Utente } from 'src/app/core/model/Utente.interface';
import { selectClassifica } from 'src/app/redux/classifica';
import { selectUtente } from 'src/app/redux/utente';
import { ClassificaService } from 'src/app/services/classifica/classifica.service';
import { MieiTorneiService } from 'src/app/services/miei-tornei/miei-tornei.service';
import { UtenteService } from 'src/app/services/utente/utente.service';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.scss']
})
export class ClassificaComponent implements OnInit {

  constructor(private classificaService: ClassificaService, private store: Store, private utenteService: UtenteService, private torneoService: MieiTorneiService) {

    this.classificaService.classifica()
   }

   utente = sessionStorage.getItem('username')
   idSessione = Number (sessionStorage.getItem('id'))




   home = "/home"
   generata
   contaPlayer = 0
   totalePlayer = 0
   punteggioMio = 0
   posizione = 0

  ngOnInit(): void {
    this.generata = sessionStorage.getItem('generata')
    console.log("username", this.utente)
    console.log(sessionStorage.getItem('generata'))


    this.store.pipe(select(selectClassifica)).subscribe(classifica => {
      classifica.forEach(clas =>{
        if(clas.idUtente == 0){
          this.punteggioMio = clas.punteggio 
          this.posizione = this.contaPlayer + 1
        }
        this.contaPlayer ++
      })
      this.totalePlayer = this.contaPlayer + 1
      this.contaPlayer = 0
    })

  }

  

  genera(){
    sessionStorage.setItem('generata','true')
    window.location.reload()
  }

  get classifica():Observable<Classifica[]>{
    return this.store.pipe(select(selectClassifica))
  }

}
