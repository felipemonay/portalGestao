import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { BoletosService } from './boletos.service';
import { Observable } from 'rxjs';
import { Boletos } from './boletos.model';

@Component({
  selector: 'app-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent implements OnInit {
  boletos: Boletos;

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private boletosSrv: BoletosService
    ) { }

  ngOnInit() {

    this.routeActiveSrv.data.subscribe(data => {
      this.boletos = data.boletos.boletos;
      console.log('boletos', this.boletos);
    });

    // this.boletosSrv.get().subscribe(resp => {
    //   this.boletos$ = resp;
    //   console.log('resp' , resp);
    // });
    window.scrollTo(0, 0);
   }


   onSubmit(proximaRota: string) {
    this.navigateTo(proximaRota);
  }

  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  backClicked() {
    this.locationSrv.back();
  }

  getBoleto(boleto) {
    window.open(boleto);
  }
}
