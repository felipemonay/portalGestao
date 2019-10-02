import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { FichaSaidaService } from './ficha-saida.service';

@Injectable({
  providedIn: 'root'
})
export class FichaSaidaResolver implements Resolve<any> {

    constructor(private fichaSaidaSrv: FichaSaidaService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        const id = route.params['idMatricula'];
        return this.fichaSaidaSrv.getByID(id);
    }
}
