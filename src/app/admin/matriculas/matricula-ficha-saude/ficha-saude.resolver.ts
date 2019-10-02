import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { FichaSaudeService } from './ficha-saude.service';

@Injectable({
  providedIn: 'root'
})
export class FichaSaudeResolver implements Resolve<any> {

    constructor(private fichaSaudeSrv: FichaSaudeService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        const id = route.params['idMatricula'];
        return this.fichaSaudeSrv.getByID(id);
    }
}
