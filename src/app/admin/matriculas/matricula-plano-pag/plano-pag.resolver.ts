import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { PlanoPagService } from './plano-pag.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoEscolhidoResolver implements Resolve<any> {

  constructor(private planoPagSrv: PlanoPagService) {}
  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
      ): Observable<any[]>|Promise<any[]>|any {

      // paramMap.get('idMatricula')
      const id = route.params['idMatricula'];
      return this.planoPagSrv.getPlanoEscolhido(id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlanosResolver implements Resolve<any> {

  constructor(private planoPagSrv: PlanoPagService) {}
  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
      ): Observable<any[]>|Promise<any[]>|any {

      // paramMap.get('idMatricula')
      const id = route.params['idMatricula'];
      return this.planoPagSrv.getPlanos(id);
  }
}
