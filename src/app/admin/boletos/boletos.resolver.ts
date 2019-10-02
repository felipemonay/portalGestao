import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { BoletosService } from './boletos.service';

@Injectable({
  providedIn: 'root'
})
export class BoletosResolver implements Resolve<any> {

    constructor(private boletosSrv: BoletosService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        const id = route.params['idMatricula'];
        return this.boletosSrv.get();
    }
}
