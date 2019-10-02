import { Home } from './admin-home.model';
import { HomeService } from './admin-home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { } from 'daterangepicker';
import { Observable, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  alunos$: Observable<Home[]>;
  matriculado: boolean;
  rematricula = 'hidden';

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private homeSrv: HomeService,
  ) { }

  ngOnInit() {

    this.alunos$ = this.homeSrv.get().pipe(
      // map(),
      // tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );
    // console.log(this.alunos$);
  }

  onSubmit(proximaRota: string) {
    this.navigateTo(proximaRota);
  }

  navigateTo(route: string, parm: any = '') {
    // console.log(parm);
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
    // this.routerSrv.navigate([route], { relativeTo: this.routeActiveSrv});
  }

}
