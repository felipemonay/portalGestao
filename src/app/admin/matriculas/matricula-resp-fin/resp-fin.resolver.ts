import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { RespFinService } from './resp-fin.service';

@Injectable({
  providedIn: 'root'
})
export class RespFinResolver implements Resolve<any> {

    constructor(private respFinSrv: RespFinService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        console.log('getListaNacionalidade');
        // paramMap.get('idMatricula')
        const id = route.params['idMatricula'];
        return this.respFinSrv.getByID(id);
    }
}
