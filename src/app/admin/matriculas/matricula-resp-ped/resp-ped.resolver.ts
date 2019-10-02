import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { RespPedService } from './resp-ped.service';

@Injectable({
  providedIn: 'root'
})
export class RespPedResolver implements Resolve<any> {

    constructor(private respPedSrv: RespPedService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        console.log('getListaNacionalidade');
        // paramMap.get('idMatricula')
        const id = route.params['idMatricula'];
        return this.respPedSrv.getByID(id);
    }
}
